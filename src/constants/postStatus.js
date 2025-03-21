const POST_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived'
};

const isValidStatus = (status) => {
  return Object.values(POST_STATUS).includes(status);
};

module.exports = {
  POST_STATUS,
  isValidStatus
};
