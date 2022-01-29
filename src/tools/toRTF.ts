export const toRTF = text => {
  return text
    .replace(/([\\{}])/g, "\\$1") // escape RTF special characters
    .replace(/\u00A0/g, "\\~") // non-breaking space
    .replace(/\u00AD/g, "\\-") // optional hyphen
    .replace(/\u2011/g, "\\_") // non-breaking hyphen
    .replace(/[^ -~]/g, c => `\\u${c.charCodeAt()}?`) // escape unicode
    .replace(/<br\W*>/gi, "\\line ") // line breaks
    .replace(/<(i|em)>/gi, "\\i ") // italic
    .replace(/<\/(i|em)>/gi, "\\i0 ")
    .replace(/<(b|strong)>/gi, "\\b ") // bold
    .replace(/<\/(b|strong)>/gi, "\\b0 ")
    .replace(/<u>/gi, "\\ul ") // underline
    .replace(/<\/u>/gi, "\\ul0 ")
    .replace(/&gt;/g, ">") // unescape HTML special characters
    .replace(/&lt;/g, "<")
    .replace(/&amp;/g, "&");
};
