const formAddMaster = document.getElementById('addNewMasterForm');
formAddMaster.addEventListener('submit', async (e) => {
    e.preventDefault();
    const numberOfOrder = formAddMaster[0].value;
    console.log('Отправлено:',JSON.stringify(formAddMaster[0].value))
    let response = await fetch(`http://localhost:4000/changeOrderByParams/${numberOfOrder}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body:{
            master: JSON.stringify(formAddMaster[0].value)
        }
    })
})