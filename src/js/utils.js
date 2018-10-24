export const parserTemplateBaseUrls = template => {
  let baseUrl = null;
  
  if (process.env.NODE_ENV === 'production') {
    baseUrl = process.env.SITE === 'klic' 
      ? process.env.BASE_URL_KLIC 
      : process.env.BASE_URL_CINEPOLIS;
  }
  else {
    baseUrl = process.env.BASE_URL;
  }
  
  return template.replace(new RegExp('{{BASE_URL}}', 'g'), baseUrl);
}