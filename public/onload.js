window.onload = async function(){
    document.querySelector("#tomorrow").valueAsDate = tomorrowDate();
    const resp = await fetch('/tasks', {method: 'GET'})
    const tasks = await resp.json()
    
    let table = document.getElementById('data')

    for(let i=0; i<tasks.length; i++){
        let row = table.insertRow(table.rows.length)
        row.insertCell(0).innerHTML = tasks[i].title
        row.insertCell(1).innerHTML = tasks[i].description
        row.insertCell(2).innerHTML = tasks[i].due_date.slice(0,10)
        if(tasks[i].status === 0){
            row.insertCell(3).innerHTML = 'Incomplete'
        }
        else if(tasks[i].status === 1){
            row.insertCell(3).innerHTML = 'Completed'
        }
        if(tasks[i].priority === 0){
            row.insertCell(4).innerHTML = 'Low'
        }
        else if(tasks[i].priority === 1){
            row.insertCell(4).innerHTML = 'Medium'
        }
        else if(tasks[i].priority === 2){
            row.insertCell(4).innerHTML = 'High'
        }
        row.insertCell(5).innerHTML = `<td><input type="button" onclick="showNotes(id)" id=${tasks[i].id} value="View note"></td>`
        row.insertCell(6).innerHTML = `<td><input type="button" onclick="editTask(id)" id=${tasks[i].id} value="Edit"></td>`
    }
}

const tomorrowDate = () => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow
}