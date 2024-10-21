document.addEventListener('DOMContentLoaded', () => {
    const albumsContainer = document.getElementById('albums');
    const albumsCardsContainer = document.getElementById('albums-cards');
    const albumsMessage = document.getElementById('albums-message');
    const toggleAlbumsButton = document.getElementById('toggle-albums');
    const createAlbumForm = document.getElementById('create-album-form');
    const createMessage = document.getElementById('create-message');
    const updateAlbumForm = document.getElementById('update-album-form');
    const updateMessage = document.getElementById('update-message');
    const deleteAlbumForm = document.getElementById('delete-album-form');
    const deleteMessage = document.getElementById('delete-message');
    let albumsList = [];
    let allAlbumsVisible = false;
  
    // Function to display albums
    const displayAlbums = (albums) => {
      albumsContainer.innerHTML = '';
      albumsCardsContainer.innerHTML = '';
      let cardContent = '';
      albums.forEach(album => {
        const albumRow = `
          <tr>
            <td>${album.id}</td>
            <td>${album.title}</td>
          </tr>
        `;
        albumsContainer.innerHTML += albumRow;
  
        cardContent += `
          <div class="col-md-6">
            <div class="card" style="background-image: url('https://via.placeholder.com/300');">
              <div class="card-body">
                <h5 class="card-title">${album.title}</h5>
                <p class="card-text">ID: ${album.id}</p>
              </div>
            </div>
          </div>
        `;
      });
      albumsCardsContainer.innerHTML = cardContent;
    };
  
    // Fetch and display the first 10 albums
    fetch('https://jsonplaceholder.typicode.com/albums?_limit=10')
      .then(response => response.json())
      .then(albums => {
        albumsList = albums;
        displayAlbums(albumsList);
      })
      .catch(error => {
        albumsMessage.classList.add('error');
        albumsMessage.textContent = 'Error al obtener los álbumes';
        albumsMessage.style.display = 'block';
        console.error('Error al obtener los álbumes:', error);
      });
  
    // Toggle the display of all albums
    toggleAlbumsButton.addEventListener('click', () => {
      if (allAlbumsVisible) {
        // Hide all albums and show only the first 10
        fetch('https://jsonplaceholder.typicode.com/albums?_limit=10')
          .then(response => response.json())
          .then(albums => {
            albumsList = albums;
            displayAlbums(albumsList);
            toggleAlbumsButton.textContent = 'Mostrar Todos los Álbumes';
            allAlbumsVisible = false;
          })
          .catch(error => {
            albumsMessage.classList.add('error');
            albumsMessage.textContent = 'Error al obtener los álbumes';
            albumsMessage.style.display = 'block';
            console.error('Error al obtener los álbumes:', error);
          });
      } else {
        // Show all albums
        fetch('https://jsonplaceholder.typicode.com/albums')
          .then(response => response.json())
          .then(albums => {
            albumsList = albums;
            displayAlbums(albumsList);
            toggleAlbumsButton.textContent = 'Ocultar Todos los Álbumes';
            allAlbumsVisible = true;
          })
          .catch(error => {
            albumsMessage.classList.add('error');
            albumsMessage.textContent = 'Error al obtener los álbumes';
            albumsMessage.style.display = 'block';
            console.error('Error al obtener los álbumes:', error);
          });
      }
    });
  
    // Manejar el envío del formulario para crear un nuevo álbum
    createAlbumForm.addEventListener('submit', event => {
      event.preventDefault();
      const title = document.getElementById('album-title').value;
  
      fetch('https://jsonplaceholder.typicode.com/albums', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title })
      })
      .then(response => response.json())
      .then(newAlbum => {
        createMessage.classList.add('success');
        createMessage.textContent = `Álbum creado: ${newAlbum.title}`;
        createMessage.classList.add('show');
        createMessage.style.backgroundColor = '#d4edda';
        setTimeout(() => {
          createMessage.classList.remove('show');
        }, 3000);
        alert('Álbum creado exitosamente');
      })
      .catch(error => {
        createMessage.classList.add('error');
        createMessage.textContent = 'Error al crear el álbum';
        createMessage.classList.add('show');
        createMessage.style.backgroundColor = '#f8d7da';
        setTimeout(() => {
          createMessage.classList.remove('show');
        }, 3000);
        alert('Error al crear el álbum');
        console.error('Error al crear el álbum:', error);
      });
    });
  
    // Manejar el envío del formulario para actualizar un álbum
    updateAlbumForm.addEventListener('submit', event => {
      event.preventDefault();
      const id = parseInt(document.getElementById('update-album-id').value);
      const newTitle = document.getElementById('update-album-title').value;
  
      const albumExists = albumsList.some(album => album.id === id);
      if (!albumExists) {
        updateMessage.classList.add('error');
        updateMessage.textContent = 'Error: ID no existe';
        updateMessage.classList.add('show');
        updateMessage.style.backgroundColor = '#f8d7da';
        setTimeout(() => {
          updateMessage.classList.remove('show');
        }, 3000);
        alert('Error: ID no existe');
        return;
      }
  
      fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: newTitle })
      })
      .then(response => response.json())
      .then(updatedAlbum => {
        updateMessage.classList.add('success');
        updateMessage.textContent = `Álbum actualizado: ${updatedAlbum.title}`;
        updateMessage.classList.add('show');
        updateMessage.style.backgroundColor = '#d4edda';
        setTimeout(() => {
          updateMessage.classList.remove('show');
        }, 3000);
        alert('Álbum actualizado exitosamente');
      })
      .catch(error => {
        updateMessage.classList.add('error');
        updateMessage.textContent = 'Error al actualizar el álbum';
        updateMessage.classList.add('show');
        updateMessage.style.backgroundColor = '#f8d7da';
        setTimeout(() => {
          updateMessage.classList.remove('show');
        }, 3000);
        alert('Error al actualizar el álbum');
        console.error('Error al actualizar el álbum:', error);
      });
    });
  
    // Manejar el envío del formulario para eliminar un álbum
    deleteAlbumForm.addEventListener('submit', event => {
      event.preventDefault();
      const id = parseInt(document.getElementById('delete-album-id').value);
  
      const albumExists = albumsList.some(album => album.id === id);
      if (!albumExists) {
        deleteMessage.classList.add('error');
        deleteMessage.textContent = 'Error: ID no existe';
        deleteMessage.classList.add('show');
        deleteMessage.style.backgroundColor = '#f8d7da';
        setTimeout(() => {
          deleteMessage.classList.remove('show');
        }, 3000);
        alert('Error: ID no existe');
        return;
      }
  
      fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
        method: 'DELETE'
      })
      .then(() => {
        deleteMessage.classList.add('success');
        deleteMessage.textContent = `Álbum con ID ${id} eliminado`;
        deleteMessage.classList.add('show');
        deleteMessage.style.backgroundColor = '#d4edda';
        setTimeout(() => {
          deleteMessage.classList.remove('show');
        }, 3000);
        alert('Álbum eliminado exitosamente');
      })
      .catch(error => {
        deleteMessage.classList.add('error');
        deleteMessage.textContent = 'Error al eliminar el álbum';
        deleteMessage.classList.add('show');
        deleteMessage.style.backgroundColor = '#f8d7da';
        setTimeout(() => {
          deleteMessage.classList.remove('show');
        }, 3000);
        alert('Error al eliminar el álbum');
        console.error('Error al eliminar el álbum:', error);
      });
    });
  });