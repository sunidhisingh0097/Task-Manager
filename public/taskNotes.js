let addNoteId = null

async function showNotes(id){
    id = Number(id)
    const resp = await fetch(`/tasks/${id}/notes`, { method: 'GET' })
    const notes = await resp.json()
    document.getElementById('id01').style.display='block'
    addNoteId = id
    document.getElementById('modalHeader').innerHTML = 'Notes :-'
    if(notes.length === 0){
        const notesList = document.getElementById('notesList')
        notesList.innerHTML = ""
        document.getElementById('modalContent').style.display = 'block'
    }
    else{
        document.getElementById('modalContent').style.display = 'none'
        const notesList = document.getElementById('notesList')
        notesList.innerHTML = ""
        notes.forEach(note => {
            let li = document.createElement("li")
            li.textContent = note.note
            notesList.appendChild(li)
        });
    }
}

async function addNotes(){

    const note = document.getElementById('noteText').value
    if(!note){
        alert('Note cannot be empty')
    }
    else{
        await fetch(`/tasks/${addNoteId}/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ note })
        })
        showNotes(addNoteId)
        document.getElementById("noteText").value = "";
    } 
}