const calculateReadingTime = (content) => {
  // Average reading speed (words per minute)
  const wordsPerMinute = 100;
  
  // Count words in content
  const wordCount = content.trim().split(/\s+/).length;
  
  // Calculate reading time in minutes
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  return readingTime;
};

module.exports = calculateReadingTime;
