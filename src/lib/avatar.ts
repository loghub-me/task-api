import sharp from 'sharp';

interface GenerateAvatarOptions {
  size: number;
  density: number;
  blockSize: number;
  seed: string;
  background: { r: number; g: number; b: number; a?: number }; // RGBA
}

const DEFAULT_OPTIONS: GenerateAvatarOptions = {
  size: 512,
  density: 0.5,
  blockSize: 64,
  seed: crypto.randomUUID(),
  background: { r: 255, g: 255, b: 255, a: 255 }, // white
};

// 아바타 버퍼를 생성하는 함수
export async function generateAvatarBuffer(partialOptions: Partial<GenerateAvatarOptions>): Promise<Buffer> {
  const options = { ...DEFAULT_OPTIONS, ...partialOptions }; // 기본 옵션과 병합
  const pixels = generateSymmetricPixels(options); // 픽셀 데이터 생성
  return pixelsToWebpBuffer(pixels, options.size); // 픽셀 데이터를 WebP 버퍼로 변환
}

// 대칭 픽셀 데이터를 생성하는 함수
function generateSymmetricPixels({
  size,
  density,
  seed,
  background,
  blockSize,
}: GenerateAvatarOptions): Uint8ClampedArray {
  // 1) size가 blockSize의 배수가 아니라면, 조정
  if (size % blockSize !== 0) {
    blockSize = gcd(size, blockSize);
  }

  // 2) seed 기반 난수 생성
  const rng = mulberry32(hashStringToInt(seed));

  // 3) 배경색과 전경색 설정
  const fgR = (rng() * 256) | 0;
  const fgG = (rng() * 256) | 0;
  const fgB = (rng() * 256) | 0;
  const bgA = background.a ?? 255;
  const fgPacked = packRGBA(fgR, fgG, fgB, 255);
  const bgPacked = packRGBA(background.r, background.g, background.b, bgA);

  // 4) 픽셀 데이터 생성
  const pixels32 = new Uint32Array(size * size);
  pixels32.fill(bgPacked); // 배경색 채우기

  const blocksPerSide = (size / blockSize) | 0; // 한 변에 들어갈 블록 개수
  const halfBlocks = (blocksPerSide / 2) | 0; // 절반 블록 개수
  const hasMiddle = blocksPerSide % 2 === 1; // 블록 개수가 홀수인 경우, 중앙 블록 존재 여부

  for (let by = 0; by < blocksPerSide; by++) {
    for (let bx = 0; bx < halfBlocks; bx++) {
      if (rng() < density) {
        fillBlock(pixels32, size, blockSize, bx, by, fgPacked); // 정방향 블록
        fillBlock(pixels32, size, blockSize, blocksPerSide - 1 - bx, by, fgPacked); // 대칭 블록
      }
    }
    if (hasMiddle && rng() < density) {
      fillBlock(pixels32, size, blockSize, halfBlocks, by, fgPacked); // 중앙 블록
    }
  }

  // 5) 8비트 RGBA 배열로 변환
  return new Uint8ClampedArray(pixels32.buffer);
}

// 픽셀 데이터를 WebP 버퍼로 변환하는 함수
async function pixelsToWebpBuffer(pixels: Uint8ClampedArray, size: number): Promise<Buffer> {
  return sharp(pixels, { raw: { width: size, height: size, channels: 4 } })
    .webp()
    .toBuffer();
}

// 블록 하나를 채우는 함수
function fillBlock(buf32: Uint32Array, size: number, block: number, bx: number, by: number, rgbaPacked: number): void {
  const startX = bx * block; // 블록의 시작 X 좌표
  const startY = by * block; // 블록의 시작 Y 좌표
  const rowStart = startY * size + startX; // 블록의 시작 인덱스

  for (let yy = 0; yy < block; yy++) {
    const offset = rowStart + yy * size;
    buf32.fill(rgbaPacked, offset, offset + block);
  }
}

// RGBA 값을 하나의 32비트로 패킹 (리틀엔디안 기준)
function packRGBA(r: number, g: number, b: number, a: number): number {
  return (a << 24) | (b << 16) | (g << 8) | r;
}

// 문자열을 해시하여 정수로 변환하는 함수 (FNV-1a 해시 알고리즘)
function hashStringToInt(seed: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// Mulberry32 난수 생성기
function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// 최대 공약수(GCD)를 계산하는 함수
function gcd(a: number, b: number): number {
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}
