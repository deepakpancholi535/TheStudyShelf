document.addEventListener('DOMContentLoaded', () => {
    const myNotesList = document.getElementById('my-notes-list');

    const fetchUserNotes = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            myNotesList.innerHTML = '<p>Please log in to view your notes.</p>';
            return;
        }

        try {
            const res = await fetch('/api/notes/my-notes', {
                headers: { 'x-auth-token': token }
            });

            if (res.ok) {
                const notes = await res.json();
                if (notes.length === 0) {
                    myNotesList.innerHTML = '<p>You have not uploaded any notes yet.</p>';
                } else {
                    myNotesList.innerHTML = '';
                    notes.forEach(note => {
                        const card = document.createElement('div');
                        card.className = 'note-card';
                        card.innerHTML = `
                            <h3>${note.title}</h3>
                            <p><strong>Subject:</strong> ${note.subject}</p>
                            <p><strong>Branch:</strong> ${note.branch}</p>
                            <p><strong>Semester:</strong> ${note.semester}</p>
                            <div class="card-actions">
                                <a href="${note.file_url}" class="cta-button" target="_blank">View Note</a>
                                <button class="delete-button" data-id="${note._id}">Delete</button>
                            </div>
                        `;
                        myNotesList.appendChild(card);
                    });
                    
                    // Add event listeners for delete buttons
                    document.querySelectorAll('.delete-button').forEach(button => {
                        button.addEventListener('click', async (e) => {
                            const noteId = e.target.dataset.id;
                            const confirmDelete = confirm('Are you sure you want to delete this note?');
                            if (confirmDelete) {
                                await deleteNote(noteId);
                            }
                        });
                    });
                }
            } else {
                window.showNotification('Failed to load your notes.');
            }
        } catch (err) {
            window.showNotification('Server error.');
        }
    };

    const deleteNote = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`/api/notes/${id}`, {
                method: 'DELETE',
                headers: { 'x-auth-token': token }
            });
            if (res.ok) {
                window.showNotification('Note deleted successfully!');
                fetchUserNotes(); // Re-fetch notes to update the list
            } else {
                window.showNotification('Failed to delete note.');
            }
        } catch (err) {
            window.showNotification('Server error.');
        }
    };

    fetchUserNotes();
});