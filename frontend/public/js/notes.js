document.addEventListener('DOMContentLoaded', () => {
    const notesList = document.getElementById('notes-list');
    const branchFilter = document.getElementById('branch-filter');
    const semesterFilter = document.getElementById('semester-filter');
    const searchInput = document.getElementById('search-input');

    const branches = ['CSE', 'ECE', 'Mechanical'];
    const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

    branches.forEach(branch => {
        const option = document.createElement('option');
        option.value = branch;
        option.textContent = branch;
        branchFilter.appendChild(option);
    });

    semesters.forEach(sem => {
        const option = document.createElement('option');
        option.value = sem;
        option.textContent = sem;
        semesterFilter.appendChild(option);
    });

    const fetchAndRenderNotes = async () => {
        try {
            const res = await fetch('/api/notes');
            const notes = await res.json();
            
            // Apply filters
            const filteredNotes = notes.filter(note => {
                const branchMatch = !branchFilter.value || note.branch === branchFilter.value;
                const semesterMatch = !semesterFilter.value || note.semester == semesterFilter.value;
                const searchMatch = !searchInput.value || note.title.toLowerCase().includes(searchInput.value.toLowerCase()) || note.subject.toLowerCase().includes(searchInput.value.toLowerCase());
                return branchMatch && semesterMatch && searchMatch;
            });

            notesList.innerHTML = '';
            if (filteredNotes.length === 0) {
                notesList.innerHTML = '<p class="no-notes">No notes found matching your criteria.</p>';
                return;
            }

            filteredNotes.forEach(note => {
                const card = document.createElement('div');
                card.className = 'note-card';
                card.innerHTML = `
                    <h3>${note.title}</h3>
                    <p><strong>Subject:</strong> ${note.subject}</p>
                    <p><strong>Branch:</strong> ${note.branch}</p>
                    <p><strong>Semester:</strong> ${note.semester}</p>
                    <p><strong>Description:</strong> ${note.description || 'N/A'}</p>
                    <div class="card-actions">
                        <a href="/api/notes/view/${note._id}" class="cta-button" target="_blank">View Note</a>
                    </div>
                `;
                notesList.appendChild(card);
            });
        } catch (err) {
            console.error(err);
            window.showNotification('Failed to load notes. Please try again.');
        }
    };

    branchFilter.addEventListener('change', fetchAndRenderNotes);
    semesterFilter.addEventListener('change', fetchAndRenderNotes);
    searchInput.addEventListener('input', fetchAndRenderNotes);
    
    fetchAndRenderNotes();
});
