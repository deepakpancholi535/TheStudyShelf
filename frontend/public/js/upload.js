document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('upload-form');
    const branchSelect = document.getElementById('note-branch');
    const semesterSelect = document.getElementById('note-semester');

    const branches = ['CSE', 'ECE', 'Mechanical','DS','AI','IoT','Civil','IT'];
    const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

    branches.forEach(branch => {
        const option = document.createElement('option');
        option.value = branch;
        option.textContent = branch;
        branchSelect.appendChild(option);
    });

    semesters.forEach(sem => {
        const option = document.createElement('option');
        option.value = sem;
        option.textContent = sem;
        semesterSelect.appendChild(option);
    });

    if (uploadForm) {
        uploadForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const token = localStorage.getItem('token');
            if (!token) {
                window.showNotification('You must be logged in to upload notes.');
                return;
            }

            const formData = new FormData();
            formData.append('title', document.getElementById('note-title').value);
            formData.append('description', document.getElementById('note-description').value);
            formData.append('category', document.getElementById('note-category').value);
            formData.append('subject', document.getElementById('note-subject').value);
            formData.append('branch', branchSelect.value);
            formData.append('semester', semesterSelect.value);
            formData.append('noteFile', document.getElementById('note-file').files[0]);

            try {
                const res = await fetch('/api/notes', {
                    method: 'POST',
                    headers: { 'x-auth-token': token },
                    body: formData,
                });

                if (res.ok) {
                    window.showNotification('Note uploaded successfully!');
                    uploadForm.reset();
                } else {
                    const data = await res.json();
                    window.showNotification(data.msg || 'Failed to upload note.');
                }
            } catch (err) {
                window.showNotification('Server error during upload.');
            }
        });
    }
});