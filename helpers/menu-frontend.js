
const getMenuFrontend = (role = 'USER_ROLE') => {
   const menu =  [
        {
            title: 'Dashboard',
            icono: 'mdi mdi-gauge',
            submenu: [
                {   title: 'Main', url: '/' },
                {   title: 'progressBar', url: 'progress'},
                {   title: 'graphics', url: 'graphic' },
                {   title: 'rxjs', url: 'rxjs' },
                {   title: 'promises', url: 'promises' }
            ],
        },
        {
            title: 'Mantenimiento',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
                // {   title: 'usuarios', url: 'usuarios' },
                {   title: 'Medicos', url: 'medicos' },
                {   title: 'Hospitales', url: 'hospitales' },
            ],
        }
    ];

   if(role === 'ADMIN_ROLE') {
       menu[1].submenu.unshift({   title: 'usuarios', url: 'usuarios' })
   }

   return menu;
}

module.exports ={
    getMenuFrontend
}