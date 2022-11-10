const newFormHandler = async (event) => {
    event.preventDefault();

  const name = document.querySelector('#blog-name').value.trim();
  const description = document.querySelector('#blog-desc').value.trim();
  const content = document.querySelector('#blog-content').value.trim();
  const language = document.querySelector('#blog-language').value.trim();


    if (name && content && description && language) {
      const response = await fetch(`/api/blog/create`, {
        method: 'POST',
        body: JSON.stringify({ name, content, description, language }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create blog');
      }
    }
  };

  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');

      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete blog');
      }
    }
  };

  document
    .querySelector('#form-submit')
    .addEventListener('click', newFormHandler);

  document
    .querySelector('.blog-list')
    .addEventListener('click', delButtonHandler);
