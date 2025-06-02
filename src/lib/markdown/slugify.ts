export const slugify = (text: string) =>
  encodeURIComponent(
    text
      .toLowerCase()
      .replace(/%20/g, '-')
      .replace(/[^가-힣ㄱ-ㅎㅏ-ㅣa-z0-9-_]/g, '-')
      .replace(/--+/g, '-')
      .replace(/^-|-$/g, '')
  );
