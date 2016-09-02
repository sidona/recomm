'use strict';

class NavbarController {
  //end-non-standard
  menu = [{
    'title': 'Oportunităţi disponibile',
    'state': 'job'
  },
    {
      'title': 'Recomandare nouă',
      'state': 'applyJob'
    },
    {
      'title': 'Recomandările mele',
      'state': 'userRecommend'
    },
    {
      'title': 'Aplicările mele',
      'state': 'myApply'
    }];

  menuDropdown=[
    {
      'title': 'Adăugare Oportunitate',
      'state': 'addJob'
    },
    {

    'title': 'Administrare CV-uri',
    'state': 'adminView'
  },
    {

      'title': 'CV-uri fără oportunitate',
      'state': 'adminViewCandidate'
    },

    {
      'title': 'Oportunităţi inactive',
      'state': 'inactiveJobs'
    }
  ];

  //start-non-standard
  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;

  }




}

angular.module('recomNodeApp')
  .controller('NavbarController', NavbarController);
