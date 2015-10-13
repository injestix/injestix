angular.module('theme.core.main_controller', ['theme.core.services'])
  .controller('MainController', ['$scope', '$theme', '$timeout', 'progressLoader', 'wijetsService', '$location',
    function($scope, $theme, $timeout, progressLoader, wijetsService, $location) {
    'use strict';
    $scope.layoutFixedHeader = $theme.get('fixedHeader');
    $scope.layoutPageTransitionStyle = $theme.get('pageTransitionStyle');
    $scope.layoutDropdownTransitionStyle = $theme.get('dropdownTransitionStyle');
    $scope.layoutPageTransitionStyleList = ['bounce',
      'flash',
      'pulse',
      'bounceIn',
      'bounceInDown',
      'bounceInLeft',
      'bounceInRight',
      'bounceInUp',
      'fadeIn',
      'fadeInDown',
      'fadeInDownBig',
      'fadeInLeft',
      'fadeInLeftBig',
      'fadeInRight',
      'fadeInRightBig',
      'fadeInUp',
      'fadeInUpBig',
      'flipInX',
      'flipInY',
      'lightSpeedIn',
      'rotateIn',
      'rotateInDownLeft',
      'rotateInDownRight',
      'rotateInUpLeft',
      'rotateInUpRight',
      'rollIn',
      'zoomIn',
      'zoomInDown',
      'zoomInLeft',
      'zoomInRight',
      'zoomInUp'
    ];

    $scope.layoutLoading = true;

    $scope.getLayoutOption = function(key) {
      return $theme.get(key);
    };

    $scope.setNavbarClass = function(classname, $event) {
      $event.preventDefault();
      $event.stopPropagation();
      $theme.set('topNavThemeClass', classname);
    };

    $scope.setSidebarClass = function(classname, $event) {
      $event.preventDefault();
      $event.stopPropagation();
      $theme.set('sidebarThemeClass', classname);
    };

    $scope.$watch('layoutFixedHeader', function(newVal, oldval) {
      if (newVal === undefined || newVal === oldval) {
        return;
      }
      $theme.set('fixedHeader', newVal);
    });
    $scope.$watch('layoutLayoutBoxed', function(newVal, oldval) {
      if (newVal === undefined || newVal === oldval) {
        return;
      }
      $theme.set('layoutBoxed', newVal);
    });
    $scope.$watch('layoutLayoutHorizontal', function(newVal, oldval) {
      if (newVal === undefined || newVal === oldval) {
        return;
      }
      $theme.set('layoutHorizontal', newVal);
    });
    $scope.$watch('layoutPageTransitionStyle', function(newVal) {
      $theme.set('pageTransitionStyle', newVal);
    });
    $scope.$watch('layoutDropdownTransitionStyle', function(newVal) {
      $theme.set('dropdownTransitionStyle', newVal);
    });
    $scope.$watch('layoutLeftbarCollapsed', function(newVal, oldVal) {
      if (newVal === undefined || newVal === oldVal) {
        return;
      }
      $theme.set('leftbarCollapsed', newVal);
    });

    $scope.toggleLeftBar = function() {
      $theme.set('leftbarCollapsed', !$theme.get('leftbarCollapsed'));
    };

    $scope.$on('themeEvent:maxWidth767', function(event, newVal) {
      $timeout(function() {
          $theme.set('leftbarCollapsed', newVal);
      });
    });
    $scope.$on('themeEvent:changed:fixedHeader', function(event, newVal) {
      $scope.layoutFixedHeader = newVal;
    });
    $scope.$on('themeEvent:changed:layoutHorizontal', function(event, newVal) {
      $scope.layoutLayoutHorizontal = newVal;
    });
    $scope.$on('themeEvent:changed:layoutBoxed', function(event, newVal) {
      $scope.layoutLayoutBoxed = newVal;
    });
    $scope.$on('themeEvent:changed:leftbarCollapsed', function(event, newVal) {
      $scope.layoutLeftbarCollapsed = newVal;
    });

    $scope.toggleSearchBar = function($event) {
      $event.stopPropagation();
      $event.preventDefault();
      $theme.set('showSmallSearchBar', !$theme.get('showSmallSearchBar'));
    };

    $scope.toggleExtraBar = function($event) {
      $event.stopPropagation();
      $event.preventDefault();
      $theme.set('extraBarShown', !$theme.get('extraBarShown'));
    };

    // there are better ways to do this, e.g. using a dedicated service
    // but for the purposes of this demo this will do
    $scope.isLoggedIn = true;
    $scope.logOut = function() {
      $scope.isLoggedIn = false;
    };
    $scope.logIn = function() {
      $scope.isLoggedIn = true;
    };

    $scope.$on('$routeChangeStart', function() {
      if ($location.path() === '') {
        return $location.path('/');
      }
      progressLoader.start();
      progressLoader.set(50);
    });
    $scope.$on('$routeChangeSuccess', function() {
      progressLoader.end();
      if ($scope.layoutLoading) {
        $scope.layoutLoading = false;
      }
      // console.log('calling wijets');
      // wijetsService.make();
    });
  }]);
angular
  .module('theme.core.navigation_controller', ['theme.core.services'])
  .controller('NavigationController', ['$scope', '$location', '$timeout', function($scope, $location, $timeout) {
    'use strict';
    $scope.menu = [{
      label: 'Explore',
      iconClasses: '',
      separator: true
    }, {
      label: 'Dashboard',
      iconClasses: 'ti ti-home',
      html: '<span class="badge badge-info">2</span>',
      url: '#/',
    }, {
      label: 'HTML Version',
      iconClasses: 'ti ti-cup',
      url: '../../',
    }, {
      label: 'Layouts',
      iconClasses: 'ti ti-layout',
      children: [{
        label: 'Grid Scaffolding',
        url: '#/layout-grid',
      }, {
        label: 'Boxed',
        url: '#/layout-boxed'
      }]
    }, {
      label: 'UI Kit',
      iconClasses: 'ti ti-view-list-alt',
      children: [{
        label: 'Typography',
        url: '#/ui-typography'
      }, {
        label: 'Buttons',
        url: '#/ui-buttons'
      }, {
        label: 'Modals',
        url: '#/ui-modals'
      }, {
        label: 'Progress',
        url: '#/ui-progressbars'
      }, {
        label: 'Pagination',
        url: '#/ui-paginations'
      }, {
        label: 'Breadcrumbs',
        url: '#/ui-breadcrumbs'
      }, {
        label: 'Labels & Badges',
        url: '#/ui-labelsbadges',
      }, {
        label: 'Alerts',
        url: '#/ui-alerts',
      }, {
        label: 'Tabs',
        url: '#/ui-tabs',
      }, {
        label: 'FontAwesome Icons',
        url: '#/ui-icons-fontawesome',
      }, {
        label: 'Themify Icons',
        url: '#/ui-icons-themify',
      }, {
        label: 'Wells',
        url: '#/ui-wells'
      }, {
        label: 'Images & Carousel',
        url: '#/ui-imagecarousel'
      }]
    }, {
      label: 'Components',
      iconClasses: 'ti ti-control-shuffle',
      children: [{
        label: 'Tiles',
        url: '#/ui-tiles'
      }, {
        label: 'Bootbox',
        url: '#/components-bootbox'
      }, {
        label: 'Pines Notifications',
        url: '#/components-notifications'
      }, {
        label: 'Sliders & Ranges',
        url: '#/ui-sliders',
      }, {
        label: 'Pulsating Elements',
        url: '#/components-pulsate'
      }, {
        label: 'jQuery Knob',
        url: '#/components-knob'
      }]
    }, {
      label: 'Forms',
      iconClasses: 'ti ti-pencil',
      children: [{
        label: 'Form Layout',
        url: '#/form-layout',
      }, {
        label: 'Components',
        url: '#/form-components',
      }, {
        label: 'Pickers',
        url: '#/form-pickers'
      }, {
        label: 'Form Wizard',
        url: '#/form-wizard'
      }, {
        label: 'Validation',
        url: '#/form-validation',
      }, {
        label: 'Form Masks',
        url: '#/form-masks'
      }, {
        label: 'Advanced Uploaders',
        url: '#/form-fileupload',
      }, {
        label: 'WYSIWYG Editor',
        url: '#/form-wysiwyg',
      }, {
        label: 'Inline Editor',
        url: '#/form-xeditable',
      }]
    }, {
      label: 'Panels',
      iconClasses: 'ti ti-settings',
      hideOnHorizontal: true,
      children: [{
        label: 'Panels',
        url: '#/ui-panels',
      }, {
        label: 'Draggable Panels',
        url: '#/ui-advancedpanels'
      }]
    }, {
      label: 'Tables',
      iconClasses: 'ti ti-layout-grid3',
      children: [{
        label: 'Tables',
        url: '#/tables-basic'
      }, {
        label: 'ngGrid',
        url: '#/tables-data',
      }, {
        label: 'Responsive Tables',
        url: '#/tables-responsive'
      }, {
        label: 'Editable Tables',
        url: '#/tables-editable',
      }]
    }, {
      label: 'Analytics',
      iconClasses: 'ti ti-stats-up',
      hideOnHorizontal: true,
      children: [{
        label: 'Flot',
        url: '#/charts-flot',
      }, {
        label: 'Chartist',
        url: '#/charts-chartist'
      }, {
        label: 'Morris.js',
        url: '#/charts-morrisjs'
      }, {
        label: 'Easy Pie Chart',
        url: '#/charts-easypiechart'
      }, {
        label: 'Sparklines',
        url: '#/charts-sparklines',
      }]
    }, {
      label: 'Maps',
      iconClasses: 'ti ti-map-alt',
      hideOnHorizontal: true,
      children: [{
        label: 'Google Maps',
        url: '#/maps-google'
      }, {
        label: 'Vector Maps',
        url: '#/maps-vector',
      }]
    }, {
      label: 'Pages',
      iconClasses: 'ti ti-file',
      hideOnHorizontal: true,
      children: [{
        label: 'Profile',
        url: '#/extras-profile'
      }, {
        label: 'FAQ',
        url: '#/extras-faq',
      }, {
        label: 'Invoice',
        url: '#/extras-invoice'
      }, {
        label: 'Registration',
        url: '#/extras-registration'
      }, {
        label: 'Password Reset',
        url: '#/extras-forgotpassword'
      }, {
        label: 'Login',
        url: '#/extras-login'
      }, {
        label: '404 Page',
        url: '#/extras-404'
      }, {
        label: '500 Page',
        url: '#/extras-500'
      }]
    }, {
      label: 'Functional Apps',
      hideOnHorizontal: true,
      separator: true
    }, {
      label: 'Inbox',
      iconClasses: 'ti ti-email',
      url: '#/inbox',
      html: '<span class="badge badge-danger">3</span>'
    }, {
      label: 'Calendar',
      iconClasses: 'ti ti-calendar',
      url: '#/calendar',
      html: '<span class="badge badge-warning">1</span>'
    }];

    var setParent = function(children, parent) {
      angular.forEach(children, function(child) {
        child.parent = parent;
        if (child.children !== undefined) {
          setParent(child.children, child);
        }
      });
    };

    $scope.findItemByUrl = function(children, url) {
      for (var i = 0, length = children.length; i < length; i++) {
        if (children[i].url && children[i].url.replace('#', '') === url) {
          return children[i];
        }
        if (children[i].children !== undefined) {
          var item = $scope.findItemByUrl(children[i].children, url);
          if (item) {
            return item;
          }
        }
      }
    };

    setParent($scope.menu, null);

    $scope.openItems = []; $scope.selectedItems = []; $scope.selectedFromNavMenu = false;

    $scope.select = function(item) {
      // close open nodes
      if (item.open) {
        item.open = false;
        return;
      }
      for (var i = $scope.openItems.length - 1; i >= 0; i--) {
        $scope.openItems[i].open = false;
      }
      $scope.openItems = [];
      var parentRef = item;
      while (parentRef !== null) {
        parentRef.open = true;
        $scope.openItems.push(parentRef);
        parentRef = parentRef.parent;
      }

      // handle leaf nodes
      if (!item.children || (item.children && item.children.length < 1)) {
        $scope.selectedFromNavMenu = true;
        for (var j = $scope.selectedItems.length - 1; j >= 0; j--) {
          $scope.selectedItems[j].selected = false;
        }
        $scope.selectedItems = [];
        parentRef = item;
        while (parentRef !== null) {
          parentRef.selected = true;
          $scope.selectedItems.push(parentRef);
          parentRef = parentRef.parent;
        }
      }
    };

    $scope.highlightedItems = [];
    var highlight = function(item) {
      var parentRef = item;
      while (parentRef !== null) {
        if (parentRef.selected) {
          parentRef = null;
          continue;
        }
        parentRef.selected = true;
        $scope.highlightedItems.push(parentRef);
        parentRef = parentRef.parent;
      }
    };

    var highlightItems = function(children, query) {
      angular.forEach(children, function(child) {
        if (child.label.toLowerCase().indexOf(query) > -1) {
          highlight(child);
        }
        if (child.children !== undefined) {
          highlightItems(child.children, query);
        }
      });
    };

    // $scope.searchQuery = '';
    $scope.$watch('searchQuery', function(newVal, oldVal) {
      var currentPath = '#' + $location.path();
      if (newVal === '') {
        for (var i = $scope.highlightedItems.length - 1; i >= 0; i--) {
          if ($scope.selectedItems.indexOf($scope.highlightedItems[i]) < 0) {
            if ($scope.highlightedItems[i] && $scope.highlightedItems[i] !== currentPath) {
              $scope.highlightedItems[i].selected = false;
            }
          }
        }
        $scope.highlightedItems = [];
      } else
      if (newVal !== oldVal) {
        for (var j = $scope.highlightedItems.length - 1; j >= 0; j--) {
          if ($scope.selectedItems.indexOf($scope.highlightedItems[j]) < 0) {
            $scope.highlightedItems[j].selected = false;
          }
        }
        $scope.highlightedItems = [];
        highlightItems($scope.menu, newVal.toLowerCase());
      }
    });

    $scope.$on('$routeChangeSuccess', function() {
      if ($scope.selectedFromNavMenu === false) {
        var item = $scope.findItemByUrl($scope.menu, $location.path());
        if (item) {
          $timeout(function() {
            $scope.select(item);
          });
        }
      }
      $scope.selectedFromNavMenu = false;
      $scope.searchQuery = '';
    });
  }]);
angular
  .module('theme.core.notifications_controller', [])
  .controller('NotificationsController', ['$scope', '$filter', function($scope, $filter) {
    'use strict';
    $scope.notifications = [{
      text: 'Profile page has been updated',
      time: '8 mins ago',
      class: 'notification-success',
      iconClasses: 'ti ti-pencil',
      seen: true
    }, {
      text: 'Update pushed successfully',
      time: '24 mins ago',
      class: 'notification-info',
      iconClasses: 'ti ti-check',
      seen: false
    }, {
      text: 'New users requested to join',
      time: '16 hours ago',
      class: 'notification-teal',
      iconClasses: 'ti ti-user',
      seen: false
    }, {
      text: 'More Orders Pending',
      time: '2 days ago',
      class: 'notification-indigo',
      iconClasses: 'ti ti-shopping-cart',
      seen: false
    }, {
      text: 'Initial Release 1.0',
      time: '4 days ago',
      class: 'notification-danger',
      iconClasses: 'ti ti-arrow-up',
      seen: false
    }, ];

    $scope.setSeen = function(item, $event) {
      $event.preventDefault();
      $event.stopPropagation();
      item.seen = true;
    };

    $scope.setUnseen = function(item, $event) {
      $event.preventDefault();
      $event.stopPropagation();
      item.seen = false;
    };

    $scope.setSeenAll = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      angular.forEach($scope.notifications, function(item) {
        item.seen = true;
      });
    };

    $scope.unseenCount = $filter('filter')($scope.notifications, {
      seen: false
    }).length;

    $scope.$watch('notifications', function(notifications) {
      $scope.unseenCount = $filter('filter')(notifications, {
        seen: false
      }).length;
    }, true);
  }]);
angular
  .module('theme.core.messages_controller', [])
  .controller('MessagesController', ['$scope', '$filter', function($scope, $filter) {
    'use strict';
    $scope.messages = [{
      name: 'Polly Paton',
      message: 'Uploaded all the...',
      time: '2 mins ago',
      thumb: 'assets/demo/avatar/avatar_01.png',
      read: false
    }, {
      name: 'Simon Corbett',
      message: 'I am signing...',
      time: '16 mins ago',
      thumb: 'assets/demo/avatar/avatar_02.png',
      read: false
    }, {
      name: 'Matt Tennant',
      message: 'Everything is work...',
      time: '2 hours ago',
      thumb: 'assets/demo/avatar/avatar_03.png',
      read: true
    }, {
      name: 'Alan Doyle',
      message: 'Please mail me the...',
      time: '6 hours ago',
      thumb: 'assets/demo/avatar/avatar_04.png',
      read: false
    }, {
      name: 'Polly Paton',
      message: 'Uploaded all the...',
      time: '12 hours ago',
      thumb: 'assets/demo/avatar/avatar_05.png',
      read: false
    }, {
      name: 'Simon Corbett',
      message: 'I am signing...',
      time: '2 days ago',
      thumb: 'assets/demo/avatar/avatar_06.png',
      read: false
    }, {
      name: 'Matt Tennant',
      message: 'Everything is no...',
      time: '4 days ago',
      thumb: 'assets/demo/avatar/avatar_07.png',
      read: true
    }, {
      name: 'Alan Doyle',
      message: 'Please mail me the...',
      time: '6 days ago',
      thumb: 'assets/demo/avatar/avatar_08.png',
      read: false
    }, ];

    $scope.setRead = function(item, $event) {
      $event.preventDefault();
      $event.stopPropagation();
      item.read = true;
    };

    $scope.setUnread = function(item, $event) {
      $event.preventDefault();
      $event.stopPropagation();
      item.read = false;
    };

    $scope.setReadAll = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      angular.forEach($scope.messages, function(item) {
        item.read = true;
      });
    };

    $scope.unseenCount = $filter('filter')($scope.messages, {
      read: false
    }).length;

    $scope.$watch('messages', function(messages) {
      $scope.unseenCount = $filter('filter')(messages, {
        read: false
      }).length;
    }, true);
  }]);
angular
  .module('theme.core.directives', []);
angular
  .module('theme.core.directives', [])
  .directive('autosize', function() {
    'use strict';
    return {
      restrict: 'AC',
      link: function(scope, element) {
        element.autosize({
          append: '\n'
        });
      }
    };
  })
  .directive('creditCard', ['$timeout', function($t) {
    'use strict';
    return {
      restrict: 'A',
      scope: {
        options: '=creditCard'
      },
      link: function(scope, element) {
        $t( function () {
          angular.element(element[0]).card({
            container: scope.options.container
          });
        }, 1);
      }
    };
  }])
  .directive('fullscreen', function() {
    'use strict';
    return {
      restrict: 'AC',
      link: function(scope, element) {
        element.fseditor({
          maxHeight: 500
        });
      }
    };
  })
  .directive('colorpicker', function() {
    'use strict';
    return {
      restrict: 'AC',
      link: function(scope, element) {
        element.colorpicker();
      }
    };
  })
  .directive('daterangepicker', function() {
    'use strict';
    return {
      restrict: 'A',
      scope: {
        options: '=daterangepicker',
        start: '=dateBegin',
        end: '=dateEnd'
      },
      link: function(scope, element) {
        element.daterangepicker(scope.options, function(start, end) {
          if (scope.start) {
            scope.start = start.format('MMMM D, YYYY');
          }
          if (scope.end) {
            scope.end = end.format('MMMM D, YYYY');
          }
          scope.$apply();
        });
      }
    };
  })
  .directive('wizard', function() {
    'use strict';
    return {
      restrict: 'A',
      scope: {
        options: '=wizard'
      },
      link: function(scope, element) {
        if (scope.options) {
          element.stepy(scope.options);

          //Make Validation Compability - see docs
          if (scope.options.validate === true) {
            element.validate({
              errorClass: 'help-block',
              validClass: 'help-block',
              highlight: function(element) {
                angular.element(element).closest('.form-group').addClass('has-error');
              },
              unhighlight: function(element) {
                angular.element(element).closest('.form-group').removeClass('has-error');
              }
            });
          }
        } else {
          element.stepy();
        }
        //Add Wizard Compability - see docs
        element.find('.stepy-navigator').wrapInner('<div class="pull-right"></div>');
      }
    };
  })
  .directive('inputmask', function() {
    'use strict';
    return {
      restrict: 'A',
      link: function(scope, element) {
        element.inputmask();
      }
    };
  })
  .directive('croppable', ['$timeout', function($t) {
    'use strict';
    return {
      restrict: 'A',
      replace: true,
      scope: {
        src: '@',
        imgSelected: '&',
        cropInit: '&'
      },
      link: function(scope, element) {
        var myImg;
        $t(function() {
          if (scope.src) {
            myImg = element;
            element.width(element.width()); // stupid width bug
            angular.element(myImg).Jcrop({
              trackDocument: true,
              onSelect: function(x) {
                $t(function() {
                  scope.imgSelected({
                    coords: x
                  });
                });
              },
              // aspectRatio: 1
            }, function() {
              // Use the API to get the real image size 
              scope.bounds = this.getBounds();
            });
          }
        });
        scope.$watch('bounds', function() {
          scope.cropInit({
            bounds: scope.bounds
          });
        });
      }
    };
  }]);
angular
  .module('theme.core.directives')
  .directive('wijets', ['wijetsService', '$rootScope', '$timeout', function(wijetsService, $rootScope, $timeout) {
    'use strict';
    return {
      restrict: 'A',
      link: function() {
        $rootScope.$on('$routeChangeSuccess', function() {
          $timeout(function () {
            wijetsService.make();
          }, 100);
        });
      }
    };
  }])
  .directive('disableAnimation', ['$animate', function($animate) {
    'use strict';
    return {
      restrict: 'A',
      link: function($scope, $element, $attrs) {
        $attrs.$observe('disableAnimation', function(value) {
          $animate.enabled(!value, $element);
        });
      }
    };
  }])
  .directive('slideOut', function() {
    'use strict';
    return {
      restrict: 'A',
      scope: {
        show: '=slideOut'
      },
      link: function(scope, element) {
        element.hide();
        scope.$watch('show', function(newVal, oldVal) {
          if (newVal !== oldVal) {
            element.slideToggle({
              complete: function() {
                scope.$apply();
              }
            });
          }
        });
      }
    };
  })
  .directive('slideOutNav', ['$timeout', function($t) {
    'use strict';
    return {
      restrict: 'A',
      scope: {
        show: '=slideOutNav'
      },
      link: function(scope, element) {
        scope.$watch('show', function(newVal) {
          if (angular.element('body').hasClass('sidebar-collapsed')) {
            if (newVal === true) {
              element.css('display', 'block');
            } else {
              element.css('display', 'none');
            }
            return;
          }
          if (newVal === true) {
            element.slideDown({
              complete: function() {
                $t(function() {
                  scope.$apply();
                });
              },
              duration: 100
            });
          } else if (newVal === false) {
            element.slideUp({
              complete: function() {
                $t(function() {
                  scope.$apply();
                });
              },
              duration: 100
            });
          }
        });
      }
    };
  }])
  .directive('autocollapse', ['$window', function($window) {
    'use strict';
    return {
      link: function(scope, element) {
        function autocollapse () {
          var navbar = $('header.navbar');
          var menu = $('header.navbar .navbar-collapse');

          $('body').removeClass('topnav-collapsed');
          $('#topnav .navbar-left').addClass('in');
          $('#navbar-links-toggle').parent('li').hide();
          $(menu).insertAfter('header.navbar .logo-area');

          if((navbar.innerHeight() > 56) || ($(window).innerWidth()<786)) { // check if we've got 2 lines Or less than 786px
              $('body').addClass('topnav-collapsed');
              $('#topnav .navbar-left').removeClass('in');
              $('#navbar-links-toggle').parent('li').show();

              navbar.append(menu.detach());
          }
        }

        angular.element($window).resize( function () {
          autocollapse();
        });
        autocollapse();
      }
    };
  }])
  .directive('pulsate', function() {
    'use strict';
    return {
      scope: {
        pulsate: '='
      },
      link: function(scope, element) {
        // stupid hack to prevent FF from throwing error
        if (element.css('background-color') === 'transparent') {
          element.css('background-color', 'rgba(0,0,0,0.01)');
        }
        angular.element(element).pulsate(scope.pulsate);
      }
    };
  })
  .directive('prettyprint', ['$window', function($window) {
    'use strict';
    return {
      restrict: 'C',
      link: function postLink(scope, element) {
        element.html($window.prettyPrintOne(element.html(), '', true));
      }
    };
  }])
  .directive('animatedContent', ['$rootScope', '$timeout', function($rootScope, $timeout) {
    'use strict';
    return {
      restrict: 'C',
      link: function postLink() {
        $rootScope.$on('$routeChangeSuccess', function() {
          $timeout( function () {
            angular.element('.animated-content .info-tile, .animated-content .panel, .animated-content .widget-weather, .animated-content .widget-tasks')
            .css('visibility', 'visible')
            .velocity('transition.slideUpIn', {stagger: 50});
          }, 10);
        });
      }
    };
  }])
  .directive('passwordVerify', function() {
    'use strict';
    return {
      require: 'ngModel',
      scope: {
        passwordVerify: '='
      },
      link: function(scope, element, attrs, ctrl) {
        scope.$watch(function() {
          var combined;

          if (scope.passwordVerify || ctrl.$viewValue) {
            combined = scope.passwordVerify + '_' + ctrl.$viewValue;
          }
          return combined;
        }, function(value) {
          if (value) {
            ctrl.$parsers.unshift(function(viewValue) {
              var origin = scope.passwordVerify;
              if (origin !== viewValue) {
                ctrl.$setValidity('passwordVerify', false);
                return undefined;
              } else {
                ctrl.$setValidity('passwordVerify', true);
                return viewValue;
              }
            });
          }
        });
      }
    };
  })
  .directive('backgroundSwitcher', function() {
    'use strict';
    return {
      restrict: 'EA',
      link: function(scope, element) {
        angular.element(element).click(function() {
          angular.element('body').css('background', angular.element(element).css('background'));
        });
      }
    };
  })
  .directive('tabdrop', function() {
    'use strict';
    return {
      restrict: 'A',
      link: function(scope, element) {
        angular.element.expr[':'].noparents = function(a,i,m){
                return angular.element(a).parents(m[3]).length < 1;
        };
        angular.element(element).filter(':noparents(.tab-right, .tab-left, .tabdrop-disabled)').tabdrop();
      }
    };
  })
  .directive('panel', function() {
    'use strict';
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        panelClass: '@',
        heading: '@',
        panelIcon: '@',
        ngDrag: '@'
      },
      templateUrl: 'templates/panel.html',
      link: function(scope, element, attrs) {
        if (attrs.ngDrag === 'true') {
          element.find('.panel-heading').attr('ng-drag-handle', '');
        }
      }
    };
  })
  .directive('toggleFullscreen', ['$window', function($window) {
    'use strict';
    return {
      restrict: 'A',
      link: function(scope, element) {
        angular.element(element).click(function() {
          if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
              if ($window.document.documentElement.requestFullScreen) {
                  $window.document.documentElement.requestFullScreen();
              } else if ($window.document.documentElement.mozRequestFullScreen) {
                  $window.document.documentElement.mozRequestFullScreen();
              } else if ($window.document.documentElement.webkitRequestFullScreen) {
                  $window.document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
              } else if ($window.document.documentElement.msRequestFullscreen) {
                  $window.document.documentElement.msRequestFullscreen();
              }
          } else {
              if ($window.document.cancelFullScreen) {
                  $window.document.cancelFullScreen();
              } else if ($window.document.mozCancelFullScreen) {
                  $window.document.mozCancelFullScreen();
              } else if ($window.document.webkitCancelFullScreen) {
                  $window.document.webkitCancelFullScreen();
              } else if ($window.document.msExitFullscreen) {
                  $window.document.msExitFullscreen();
              }
          }
        });
      }
    };
  }])
  .directive('icheck', ['$timeout', function($timeout) {
    'use strict';
    return {
      require: '?ngModel',
      link: function($scope, element, $attrs, ngModel) {
        return $timeout(function() {
          var parentLabel = element.parent('label');
          if (parentLabel.length) {
            parentLabel.addClass('icheck-label');
          }
          var value;
          value = $attrs.value;

          $scope.$watch($attrs.ngModel, function() {
            angular.element(element).iCheck('update');
          });

          return angular.element(element).iCheck({
            checkboxClass: $attrs.icheck.length? 'icheckbox_'+$attrs.icheck:'icheckbox_minimal-blue',
            radioClass: $attrs.icheck.length? 'iradio_'+$attrs.icheck:'iradio_minimal-blue'
          }).on('ifChanged', function(event) {
            if (angular.element(element).attr('type') === 'checkbox' && $attrs.ngModel) {
              $scope.$apply(function() {
                return ngModel.$setViewValue(event.target.checked);
              });
            }
            if (angular.element(element).attr('type') === 'radio' && $attrs.ngModel) {
              return $scope.$apply(function() {
                return ngModel.$setViewValue(value);
              });
            }
          });
        });
      }
    };
  }])
  .directive('knob', function() {
    'use strict';
    return {
      restrict: 'EA',
      template: '<input class="dial" type="text"/>',
      scope: {
        options: '='
      },
      replace: true,
      link: function(scope, element) {
        angular.element(element).knob(scope.options);
      }
    };
  })
  .directive('uiBsSlider', ['$timeout', function($timeout) {
    'use strict';
    return {
      link: function(scope, element) {
        // $timeout is needed because certain wrapper directives don't
        // allow for a correct calculation of width
        $timeout(function() {
          element.slider();
        });
      }
    };
  }])
  .directive('tileLarge', function() {
    'use strict';
    return {
      restrict: 'E',
      scope: {
        item: '=data'
      },
      templateUrl: 'templates/tile-large.html',
      replace: true,
      transclude: true
    };
  })
  .directive('stickyScroll', function() {
    'use strict';
    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        function stickyTop() {
          var topMax = parseInt(attr.stickyScroll);
          var headerHeight = angular.element('header').height();
          if (headerHeight > topMax) {
            topMax = headerHeight;
          }
          if (angular.element('body').hasClass('static-header') === false) {
            return element.css('top', topMax + 'px');
          }
          var windowTop = angular.element(window).scrollTop();
          if (windowTop < topMax) {
            element.css('top', (topMax - windowTop) + 'px');
          } else {
            element.css('top', 0 + 'px');
          }
        }

        angular.element(function() {
          angular.element(window).scroll(stickyTop);
          stickyTop();
        });
      }
    };
  })
  .directive('rightbarRightPosition', function() {
    'use strict';
    return {
      restrict: 'A',
      scope: {
        isFixedLayout: '=rightbarRightPosition'
      },
      link: function(scope) {
        scope.$watch('isFixedLayout', function(newVal, oldVal) {
          if (newVal !== oldVal) {
            setTimeout(function() {
              var $pc = angular.element('#wrapper');
              var endingRight = (angular.element(window).width() - ($pc.offset().left + $pc.outerWidth()));
              if (endingRight < 0) {
                endingRight = 0;
              }
              angular.element('.infobar').css('right', endingRight);
            }, 100);
          }
        });
      }
    };
  })
  .directive('loadAsModal', ['$bootbox', function($bootbox) {
    'use strict';
    return {
      restrict: 'AE',
      link: function(scope, element) {
        element.click( function (event) {
          event.preventDefault();
          var img = element.attr('src');
          var imgname = element.closest('.item-wrapper').attr('data-name');

          $bootbox.dialog({
              message: '<img src="' + img + '" class="img-responsive" />',
              title: imgname,
              buttons: {
                  close: {
                      label: 'Close',
                      className: 'btn-default'
                  }
              }
          });

          angular.element('.modal .bootbox-close-button').hide();
        })
      }
    };
  }])
  .directive('backToTop', function() {
    'use strict';
    return {
      restrict: 'AE',
      link: function(scope, element) {
        element.click(function() {
          angular.element('body').scrollTop(0);
        });
      }
    };
  })
  .directive('toTopOnLoad', ['$rootScope', function($rootScope) {
    'use strict';
    return {
      restrict: 'AE',
      link: function() {
        $rootScope.$on('$routeChangeSuccess', function() {
          angular.element('body').scrollTop(0);
        });
      }
    };
  }])
  .directive('fauxOffcanvas', ['EnquireService', '$window', function(EnquireService, $window) {
    'use strict';
    return {
      restrict: 'AE',
      link: function() {
        EnquireService.register('screen and (max-width: 767px)', {
            match : function() {  //smallscreen
                angular.element('body').addClass('sidebar-collapsed');

                setWidthtoContent();
                angular.element(window).on('resize', setWidthtoContent);
            },
            unmatch : function() {  //bigscreen
                angular.element('body').removeClass('sidebar-collapsed');

                angular.element('.static-content').css('width','');
                angular.element($window).off('resize', setWidthtoContent);
            }
        });
            
        function setWidthtoContent() {
            var w = angular.element('#wrapper').innerWidth();
            angular.element('.static-content').css('width',(w)+'px');
        }
      }
    };
  }])
  .directive('scrollToBottom', function() {
    'use strict';
    return {
      restrict: 'A',
      scope: {
        model: '=scrollToBottom'
      },
      link: function(scope, element) {
        scope.$watch('model', function(n, o) {
          if (n !== o) {
            element[0].scrollTop = element[0].scrollHeight;
          }
        });
      }
    };
  });
 
angular.module('theme.core.template_overrides', [])
  .config(['$provide', function($provide) {
    'use strict';
    $provide.decorator('tabsetDirective', function($delegate) {
      $delegate[0].templateUrl = function(element, attr) {
        if (attr.tabPosition || attr.tabTheme) {
          if (attr.tabPosition && (attr.tabPosition === '\'bottom\'' || attr.tabPosition === 'bottom')) {
            return 'templates/themed-tabs-bottom.html';
          }
          return 'templates/themed-tabs.html';
        } else if (attr.panelTabs && attr.heading !== undefined) {
          return 'templates/panel-tabs.html';
        } else if (attr.panelTabs && attr.heading === undefined) {
          return 'templates/panel-tabs-without-heading.html';
        } else {
          return 'templates/themed-tabs.html';
        }
      };

      $delegate[0].$$isolateBindings.heading = {
        attrName: 'heading',
        mode: '@',
        optional: true
      };

      $delegate[0].$$isolateBindings.panelClass = {
        attrName: 'panelClass',
        mode: '@',
        optional: true
      };

      $delegate[0].$$isolateBindings.panelIcon = {
        attrName: 'panelIcon',
        mode: '@',
        optional: true
      };

      $delegate[0].$$isolateBindings.theme = {
        attrName: 'tabTheme',
        mode: '@',
        optional: true
      };

      $delegate[0].$$isolateBindings.position = {
        attrName: 'tabPosition',
        mode: '@',
        optional: true
      };

      $delegate[0].$$isolateBindings.draggable = {
        attrName: 'ngDrag',
        mode: '=',
        optional: true
      };

      return $delegate;
    });

    $provide.decorator('paginationDirective', function($delegate) {
      $delegate[0].templateUrl = function(element, attr) {
        if (attr.defaultTexts !== undefined) {
          return 'template/pagination/pagination_default.html';
        } else {
          return 'template/pagination/pagination.html';
        }
      };

      return $delegate;
    });

    $provide.decorator('pagerDirective', function($delegate) {
      $delegate[0].templateUrl = function(element, attr) {
        if (attr.defaultTexts !== undefined) {
          return 'template/pagination/pager_default.html';
        } else {
          return 'template/pagination/pager.html';
        }
      };

      return $delegate;
    });
  }])
  /* jshint ignore:start */
  .run(['$templateCache', function($templateCache) {
    $templateCache.put('footerTemplate.html',
      "<div ng-show=\"showFooter\" class=\"ng-grid-footer\" ng-style=\"footerStyle()\">\r" +
      "\n" +
      "    <div class=\"col-md-4\" >\r" +
      "\n" +
      "        <div class=\"ngFooterTotalItems\" ng-class=\"{'ngNoMultiSelect': !multiSelect}\" >\r" +
      "\n" +
      "            <span class=\"ngLabel\">{{i18n.ngTotalItemsLabel}} {{maxRows()}}</span><span ng-show=\"filterText.length > 0\" class=\"ngLabel\">({{i18n.ngShowingItemsLabel}} {{totalFilteredItemsLength()}})</span>\r" +
      "\n" +
      "        </div>\r" +
      "\n" +
      "        <div class=\"ngFooterSelectedItems\" ng-show=\"multiSelect\">\r" +
      "\n" +
      "            <span class=\"ngLabel\">{{i18n.ngSelectedItemsLabel}} {{selectedItems.length}}</span>\r" +
      "\n" +
      "        </div>\r" +
      "\n" +
      "    </div>\r" +
      "\n" +
      "    <div class=\"col-md-4\" ng-show=\"enablePaging\" ng-class=\"{'ngNoMultiSelect': !multiSelect}\">\r" +
      "\n" +
      "            <label class=\"control-label ng-grid-pages center-block\">{{i18n.ngPageSizeLabel}}\r" +
      "\n" +
      "               <select class=\"form-control input-sm\" ng-model=\"pagingOptions.pageSize\" >\r" +
      "\n" +
      "                      <option ng-repeat=\"size in pagingOptions.pageSizes\">{{size}}</option>\r" +
      "\n" +
      "                </select>\r" +
      "\n" +
      "        </label>\r" +
      "\n" +
      "</div>\r" +
      "\n" +
      // "<pagination total-items=\"totalFilteredItemsLength()\" ng-model=\"pagingOptions.currentPage\"></pagination>" +
      // "\n" +
      "     <div class=\"col-md-4\">\r" +
      "\n" +
      "        <div class=\"pull-right ng-grid-pagination\">\r" +
      "\n" +
      "            <button type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"pageToFirst()\" ng-disabled=\"cantPageBackward()\" title=\"{{i18n.ngPagerFirstTitle}}\"><i class=\"fa fa-angle-double-left\"></i></button>\r" +
      "\n" +
      "            <button type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"pageBackward()\" ng-disabled=\"cantPageBackward()\" title=\"{{i18n.ngPagerPrevTitle}}\"><i class=\"fa fa-angle-left\"></i></button>\r" +
      "\n" +
      "            <label class=\"control-label\">\r" +
      "\n" +
      "                   <input class=\"form-control input-sm\" min=\"1\" max=\"{{currentMaxPages}}\" type=\"number\" style=\"width:50px; height: 24px; margin-top: 1px; padding: 0 4px;\" ng-model=\"pagingOptions.currentPage\"/>\r" +
      "\n" +
      "            </label>\r" +
      "\n" +
      "            <span class=\"ngGridMaxPagesNumber\" ng-show=\"maxPages() > 0\">/ {{maxPages()}}</span>\r" +
      "\n" +
      "            <button type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"pageForward()\" ng-disabled=\"cantPageForward()\" title=\"{{i18n.ngPagerNextTitle}}\"><i class=\"fa fa-angle-right\"></i></button>\r" +
      "\n" +
      "            <button type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"pageToLast()\" ng-disabled=\"cantPageToLast()\" title=\"{{i18n.ngPagerLastTitle}}\"><i class=\"fa fa-angle-double-right\"></i></button>\r" +
      "\n" +
      "        </div>\r" +
      "\n" +
      "     </div>\r" +
      "\n" +
      "</div>\r" +
      "\n"
    );

    $templateCache.put("template/rating/rating.html",
      "<span ng-mouseleave=\"reset()\" ng-keydown=\"onKeydown($event)\" tabindex=\"0\" role=\"slider\" aria-valuemin=\"0\" aria-valuemax=\"{{range.length}}\" aria-valuenow=\"{{value}}\">\n" +
      "    <i ng-repeat=\"r in range track by $index\" ng-mouseenter=\"enter($index + 1)\" ng-click=\"rate($index + 1)\" class=\"fa\" ng-class=\"$index < value && (r.stateOn || 'fa-star') || (r.stateOff || 'fa-star-o')\">\n" +
      "        <span class=\"sr-only\">({{ $index < value ? '*' : ' ' }})</span>\n" +
      "    </i>\n" +
      "</span>");

    $templateCache.put("bootstrap/match.tpl.html", "<div class=\"ui-select-match\" ng-hide=\"$select.open\" ng-disabled=\"$select.disabled\" ng-class=\"{\'btn-default-focus\':$select.focus}\"><button type=\"button\" class=\"form-control ui-select-toggle\" tabindex=\"-1\" ;=\"\" ng-disabled=\"$select.disabled\" ng-click=\"$select.activate()\"><span ng-show=\"$select.isEmpty()\" class=\"ui-select-placeholder text-muted\">{{$select.placeholder}}</span> <span ng-hide=\"$select.isEmpty()\" class=\"ui-select-match-text\" ng-class=\"{\'ui-select-allow-clear\': $select.allowClear && !$select.isEmpty()}\" ng-transclude=\"\"></span> <i class=\"caret caret-right\" ng-click=\"$select.toggle($event)\"></i></button> <button type=\"button\" class=\"ui-select-clear\" ng-if=\"$select.allowClear && !$select.isEmpty()\" ng-click=\"$select.select(undefined)\"><i class=\"fa fa-times\"></i></button></div>");

    $templateCache.put("template/modal/backdrop.html",
      "<div class=\"modal-backdrop fade {{ backdropClass }}\"\n" +
      "     ng-class=\"{in: animate}\"\n" +
      "     ng-style=\"{'z-index': 1240 + (index && 1 || 0) + index*10}\"\n" +
      "></div>\n" +
      "");
    $templateCache.put("template/modal/window.html",
      "<div tabindex=\"-1\" role=\"dialog\" class=\"modal fade\" ng-class=\"{in: animate}\" ng-style=\"{'z-index': 1250 + index*10, display: 'block'}\" ng-click=\"close($event)\">\n" +
      "    <div class=\"modal-dialog\" ng-class=\"{'modal-sm': size == 'sm', 'modal-lg': size == 'lg'}\"><div class=\"modal-content\" modal-transclude></div></div>\n" +
      "</div>");

    $templateCache.put("template/pagination/pager_default.html",
      "<ul class=\"pager\">\n" +
      "  <li ng-class=\"{disabled: noPrevious(), previous: align}\"><a href ng-click=\"selectPage(page - 1)\"><i class=\"fa fa-angle-left\"></i></a></li>\n" +
      "  <li ng-class=\"{disabled: noNext(), next: align}\"><a href ng-click=\"selectPage(page + 1)\"><i class=\"fa fa-angle-right\"></i></a></li>\n" +
      "</ul>");

    $templateCache.put("template/pagination/pagination_default.html",
      "<ul class=\"pagination\">\n" +
      "  <li ng-if=\"boundaryLinks\" ng-class=\"{disabled: noPrevious()}\"><a href ng-click=\"selectPage(1)\"><i class=\"fa fa-angle-double-left\"></i></a></li>\n" +
      "  <li ng-if=\"directionLinks\" ng-class=\"{disabled: noPrevious()}\"><a href ng-click=\"selectPage(page - 1)\"><i class=\"fa fa-angle-left\"></i></a></li>\n" +
      "  <li ng-repeat=\"page in pages track by $index\" ng-class=\"{active: page.active}\"><a href ng-click=\"selectPage(page.number)\">{{page.text}}</a></li>\n" +
      "  <li ng-if=\"directionLinks\" ng-class=\"{disabled: noNext()}\"><a href ng-click=\"selectPage(page + 1)\"><i class=\"fa fa-angle-right\"></i></a></li>\n" +
      "  <li ng-if=\"boundaryLinks\" ng-class=\"{disabled: noNext()}\"><a href ng-click=\"selectPage(totalPages)\"><i class=\"fa fa-angle-double-right\"></i></a></li>\n" +
      "</ul>");

    $templateCache.put("template/accordion/accordion-group.html",
      "<div class=\"panel panel-default\">\n" +
      "  <div class=\"panel-heading\">\n" +
      "    <h2 class=\"panel-title\">\n" +
      "      <a href class=\"accordion-toggle\" ng-click=\"toggleOpen()\" accordion-transclude=\"heading\"><span ng-class=\"{'text-muted': isDisabled}\">{{heading}}</span></a>\n" +
      "    </h2>\n" +
      "  </div>\n" +
      "  <div class=\"panel-collapse\" collapse=\"!isOpen\">\n" +
      "   <div class=\"panel-body\" ng-transclude></div>\n" +
      "  </div>\n" +
      "</div>\n" +
      "");

    $templateCache.put("template/carousel/carousel.html",
      "<div ng-mouseenter=\"pause()\" ng-mouseleave=\"play()\" class=\"carousel\" ng-swipe-right=\"prev()\" ng-swipe-left=\"next()\">\n" +
      "    <ol class=\"carousel-indicators\" ng-show=\"slides.length > 1\">\n" +
      "        <li ng-repeat=\"slide in slides track by $index\" ng-class=\"{active: isActive(slide)}\" ng-click=\"select(slide)\"></li>\n" +
      "    </ol>\n" +
      "    <div class=\"carousel-inner\" ng-transclude></div>\n" +
      "    <a class=\"left carousel-control\" ng-click=\"prev()\" ng-show=\"slides.length > 1\"><span class=\"fa fa-prev icon-prev\"></span></a>\n" +
      "    <a class=\"right carousel-control\" ng-click=\"next()\" ng-show=\"slides.length > 1\"><span class=\"fa fa-next icon-next\"></span></a>\n" +
      "</div>\n" +
      "");

    $templateCache.put("template/datepicker/day.html",
      "<table role=\"grid\" aria-labelledby=\"{{uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
      "  <thead>\n" +
      "    <tr>\n" +
      "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"fa fa-chevron-left\"></i></button></th>\n" +
      "      <th colspan=\"{{5 + showWeeks}}\"><button id=\"{{uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"toggleMode()\" tabindex=\"-1\" style=\"width:100%;\"><strong>{{title}}</strong></button></th>\n" +
      "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"fa fa-chevron-right\"></i></button></th>\n" +
      "    </tr>\n" +
      "    <tr>\n" +
      "      <th ng-show=\"showWeeks\" class=\"text-center\"></th>\n" +
      "      <th ng-repeat=\"label in labels track by $index\" class=\"text-center\"><small aria-label=\"{{label.full}}\">{{label.abbr}}</small></th>\n" +
      "    </tr>\n" +
      "  </thead>\n" +
      "  <tbody>\n" +
      "    <tr ng-repeat=\"row in rows track by $index\">\n" +
      "      <td ng-show=\"showWeeks\" class=\"text-center h6\"><em>{{ weekNumbers[$index] }}</em></td>\n" +
      "      <td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{dt.uid}}\" aria-disabled=\"{{!!dt.disabled}}\">\n" +
      "        <button type=\"button\" style=\"width:100%;\" class=\"btn btn-default btn-sm\" ng-class=\"{'btn-info': dt.selected, active: isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"{'text-muted': dt.secondary, 'text-info': dt.current}\">{{dt.label}}</span></button>\n" +
      "      </td>\n" +
      "    </tr>\n" +
      "  </tbody>\n" +
      "</table>\n" +
      "");

    $templateCache.put("template/datepicker/month.html",
      "<table role=\"grid\" aria-labelledby=\"{{uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
      "  <thead>\n" +
      "    <tr>\n" +
      "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"fa fa-chevron-left\"></i></button></th>\n" +
      "      <th><button id=\"{{uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"toggleMode()\" tabindex=\"-1\" style=\"width:100%;\"><strong>{{title}}</strong></button></th>\n" +
      "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"fa fa-chevron-right\"></i></button></th>\n" +
      "    </tr>\n" +
      "  </thead>\n" +
      "  <tbody>\n" +
      "    <tr ng-repeat=\"row in rows track by $index\">\n" +
      "      <td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{dt.uid}}\" aria-disabled=\"{{!!dt.disabled}}\">\n" +
      "        <button type=\"button\" style=\"width:100%;\" class=\"btn btn-default\" ng-class=\"{'btn-info': dt.selected, active: isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"{'text-info': dt.current}\">{{dt.label}}</span></button>\n" +
      "      </td>\n" +
      "    </tr>\n" +
      "  </tbody>\n" +
      "</table>\n" +
      "");

    $templateCache.put("template/datepicker/year.html",
      "<table role=\"grid\" aria-labelledby=\"{{uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
      "  <thead>\n" +
      "    <tr>\n" +
      "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"fa fa-chevron-left\"></i></button></th>\n" +
      "      <th colspan=\"3\"><button id=\"{{uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"toggleMode()\" tabindex=\"-1\" style=\"width:100%;\"><strong>{{title}}</strong></button></th>\n" +
      "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"fa fa-chevron-right\"></i></button></th>\n" +
      "    </tr>\n" +
      "  </thead>\n" +
      "  <tbody>\n" +
      "    <tr ng-repeat=\"row in rows track by $index\">\n" +
      "      <td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{dt.uid}}\" aria-disabled=\"{{!!dt.disabled}}\">\n" +
      "        <button type=\"button\" style=\"width:100%;\" class=\"btn btn-default\" ng-class=\"{'btn-info': dt.selected, active: isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"{'text-info': dt.current}\">{{dt.label}}</span></button>\n" +
      "      </td>\n" +
      "    </tr>\n" +
      "  </tbody>\n" +
      "</table>\n" +
      "");

  }])
  /* jshint ignore:end */
  ;
/* jshint ignore:start */
angular.module('theme.core.templates', []).run(['$templateCache', function ($templateCache) {
  'use strict';

  $templateCache.put('templates/nav_renderer.html',
    "<span ng-if=\"item.separator==true\">{{item.label}}</span>\r" +
    "\n" +
    "<a ng-if=\"!item.separator\" ng-click=\"select(item)\" ng-href=\"{{item.url}}\">\r" +
    "\n" +
    "  <i ng-if=\"item.iconClasses\" class=\"{{item.iconClasses}}\"></i><span>{{item.label}}</span>\r" +
    "\n" +
    "  <span ng-bind-html=\"item.html\"></span>\r" +
    "\n" +
    "</a>\r" +
    "\n" +
    "<ul ng-if=\"item.children.length\" data-slide-out-nav=\"item.open || (searchQuery.length>0 && item.selected)\">\r" +
    "\n" +
    "    <li ng-repeat=\"item in item.children\"\r" +
    "\n" +
    "      ng-class=\"{ hasChild: (item.children!==undefined),\r" +
    "\n" +
    "                      active: item.selected,\r" +
    "\n" +
    "                        open: (item.children!==undefined) && item.open,\r" +
    "\n" +
    "              'search-focus': (searchQuery.length>0 && item.selected) }\"\r" +
    "\n" +
    "    ng-show=\"!(searchQuery.length>0 && !item.selected)\"\r" +
    "\n" +
    "      ng-include=\"'templates/nav_renderer.html'\"\r" +
    "\n" +
    "    ></li>\r" +
    "\n" +
    "</ul>"
  );


  $templateCache.put('templates/nav_renderer_horizontal.html',
    "<a ng-click=\"select(item)\" ng-href=\"{{item.url}}\">\r" +
    "\n" +
    "\t<i ng-if=\"item.iconClasses\" class=\"{{item.iconClasses}}\"></i><span>{{item.label}}</span>\r" +
    "\n" +
    "</a>\r" +
    "\n" +
    "<ul ng-if=\"item.children.length\" class=\"dropdown-menu\">\r" +
    "\n" +
    "\t<li ng-repeat=\"item in item.children\"\r" +
    "\n" +
    "    \tng-class=\"{ hasChild: (item.children!==undefined),\r" +
    "\n" +
    "        \t\t\t  active: item.selected,\r" +
    "\n" +
    "\t\t\t\t\t\topen: (item.children!==undefined) && item.open }\"\r" +
    "\n" +
    "      ng-include=\"'templates/nav_renderer_horizontal.html'\"\r" +
    "\n" +
    "    ></li>\r" +
    "\n" +
    "</ul>\r" +
    "\n"
  );


  $templateCache.put('templates/panel-tabs-without-heading.html',
    "<div class=\"panel {{panelClass}}\">\r" +
    "\n" +
    "  <div class=\"panel-heading\" ng-attr-ng-drag-handle=\"{{draggable}}\">\r" +
    "\n" +
    "        <h2>\r" +
    "\n" +
    "            <ul class=\"nav nav-{{type || 'tabs'}}\" ng-class=\"{'nav-stacked': vertical, 'nav-justified': justified}\" ng-transclude></ul>\r" +
    "\n" +
    "        </h2>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "  <div class=\"panel-body\">\r" +
    "\n" +
    "    <div class=\"tab-content\">\r" +
    "\n" +
    "        <div class=\"tab-pane\"\r" +
    "\n" +
    "            ng-repeat=\"tab in tabs\"\r" +
    "\n" +
    "            ng-class=\"{active: tab.active}\"\r" +
    "\n" +
    "            tab-content-transclude=\"tab\">\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('templates/panel-tabs.html',
    "<div class=\"panel {{panelClass}}\">\r" +
    "\n" +
    "  <div class=\"panel-heading\" ng-attr-ng-drag-handle=\"{{draggable}}\">\r" +
    "\n" +
    "        <h2><i ng-if=\"panelIcon\" class=\"{{panelIcon}}\"></i>{{(panelIcon? \" \":\"\")+heading}}</h2>\r" +
    "\n" +
    "        <div class=\"panel-ctrls\">\r" +
    "\n" +
    "            <ul class=\"nav nav-{{type || 'tabs'}}\" ng-class=\"{'nav-stacked': vertical, 'nav-justified': justified}\" ng-transclude></ul>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "  <div class=\"panel-body\">\r" +
    "\n" +
    "    <div class=\"tab-content\">\r" +
    "\n" +
    "        <div class=\"tab-pane\"\r" +
    "\n" +
    "            ng-repeat=\"tab in tabs\"\r" +
    "\n" +
    "            ng-class=\"{active: tab.active}\"\r" +
    "\n" +
    "            tab-content-transclude=\"tab\">\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('templates/panel.html',
    "<div class=\"panel {{panelClass}}\">\r" +
    "\n" +
    "  <div class=\"panel-heading\">\r" +
    "\n" +
    "        <h2><i ng-if=\"panelIcon\" class=\"{{panelIcon}}\"></i>{{(panelIcon? \" \":\"\")+heading}}</h2>\r" +
    "\n" +
    "        <div class=\"panel-ctrls\">\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "  <div class=\"panel-body\" ng-transclude>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('templates/themed-tabs-bottom.html',
    "<div class=\"tab-container tab-{{theme || 'primary'}} tab-{{position || 'normal'}}\">\r" +
    "\n" +
    "  <div class=\"tab-content\">\r" +
    "\n" +
    "    <div class=\"tab-pane\"\r" +
    "\n" +
    "        ng-repeat=\"tab in tabs\"\r" +
    "\n" +
    "        ng-class=\"{active: tab.active}\"\r" +
    "\n" +
    "        tab-content-transclude=\"tab\">\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "  <ul class=\"nav nav-{{type || 'tabs'}}\" ng-class=\"{'nav-stacked': vertical, 'nav-justified': justified}\" ng-transclude></ul>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('templates/themed-tabs.html',
    "<div class=\"tab-container tab-{{theme || 'primary'}} tab-{{position || 'normal'}}\">\r" +
    "\n" +
    "  <ul class=\"nav nav-{{type || 'tabs'}}\" ng-class=\"{'nav-stacked': vertical, 'nav-justified': justified}\" ng-transclude></ul>\r" +
    "\n" +
    "  <div class=\"tab-content\">\r" +
    "\n" +
    "    <div class=\"tab-pane\"\r" +
    "\n" +
    "        ng-repeat=\"tab in tabs\"\r" +
    "\n" +
    "        ng-class=\"{active: tab.active}\"\r" +
    "\n" +
    "        tab-content-transclude=\"tab\">\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('templates/tile-large.html',
    "<a class=\"info-tile tile-{{item.color}}\" ng-href=\"{{item.href}}\">\r" +
    "\n" +
    "    <div class=\"tile-heading\">\r" +
    "\n" +
    "        <span>{{item.title}}</span>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"tile-icon\">\r" +
    "\n" +
    "    \t<i class=\"{{item.classes}}\"></i>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"tile-body\">\r" +
    "\n" +
    "        <span ng-show=\"item.text\">{{item.text}}</span>\r" +
    "\n" +
    "        <span ng-show=\"!item.text\" ng-transclude></span>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"tile-footer\">\r" +
    "\n" +
    "\t    <span class=\"text-{{item.infoClass}}\">{{item.titleBarInfo}}</span>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</a>\r" +
    "\n"
  );
}])
/* jshint ignore:end */
angular
  .module('theme.core.services', [])
  .factory('progressLoader', function() {
    'use strict';

    angular.element.skylo({
      flat: true
    });

    return {
      start: function() {
        angular.element.skylo('start');
      },
      set: function(position) {
        angular.element.skylo('set', position);
      },
      end: function() {
        angular.element.skylo('end');
      },
      get: function() {
        return angular.element.skylo('get');
      },
      inch: function(amount) {
        angular.element.skylo('show', function() {
          angular.element(document).skylo('inch', amount);
        });
      }
    };
  })
  .factory('EnquireService', ['$window', function($window) {
    'use strict';
    return $window.enquire;
  }])
  .factory('wijetsService', ['$window', function($window) {
    'use strict';

    $window.$.wijets.registerAction( {
        handle: "colorpicker",
        html: '<div class="dropdown"><span class="button-icon has-bg dropdown-toggle" data-toggle="dropdown"><i class="ti ti-palette"></i></span>'+
        '<ul class="panel-color-list dropdown-menu arrow" role="menu">'+
            '<li><span data-style="panel-info"></span></li>'+
            '<li><span data-style="panel-primary"></span></li>'+
            '<li><span data-style="panel-blue"></span></li>'+
            '<li><span data-style="panel-indigo"></span></li>'+
            '<li><span data-style="panel-deeppurple"></span></li>'+
            '<li><span data-style="panel-purple"></span></li>'+
            '<li><span data-style="panel-pink"></span></li>'+
            '<li><span data-style="panel-danger"></span></li>'+
            '<li><span data-style="panel-teal"></span></li>'+
            '<li><span data-style="panel-green"></span></li>'+
            '<li><span data-style="panel-success"></span></li>'+
            '<li><span data-style="panel-lime"></span></li>'+
            '<li><span data-style="panel-yellow"></span></li>'+
            '<li><span data-style="panel-warning"></span></li>'+
            '<li><span data-style="panel-orange"></span></li>'+
            '<li><span data-style="panel-deeporange"></span></li>'+
            '<li><span data-style="panel-midnightblue"></span></li>'+
            '<li><span data-style="panel-bluegray"></span></li>'+
            '<li><span data-style="panel-bluegraylight"></span></li>'+
            '<li><span data-style="panel-black"></span></li>'+
            '<li><span data-style="panel-gray"></span></li>'+
            '<li><span data-style="panel-default"></span></li>'+
            '<li><span data-style="panel-white"></span></li>'+
            '<li><span data-style="panel-brown"></span></li>'+
        '</ul></div>',
        onClick: function () {
        },
        onInit: function () {
            var headerStyle = $(this).getWidgetState('headerStyle');
            if (headerStyle) {
                var widget = $(this).closest('[data-widget]');
                widget.removeClass('panel-info panel-primary panel-blue panel-indigo panel-deeppurple panel-purple panel-pink panel-danger panel-teal panel-green panel-success panel-lime panel-yellow panel-warning panel-orange panel-deeporange panel-midnightblue panel-bluegray panel-bluegraylight panel-black panel-gray panel-default panel-white panel-brown')
                    .addClass(headerStyle);
            }
            var button = $(this);
            $(this).find('.dropdown-menu').bind('click', function (e) {
                e.stopPropagation();
            });
            $(this).find('li span').bind('click', function (e) {
                var widget = button.closest('[data-widget]');
                widget.removeClass('panel-info panel-primary panel-blue panel-indigo panel-deeppurple panel-purple panel-pink panel-danger panel-teal panel-green panel-success panel-lime panel-yellow panel-warning panel-orange panel-deeporange panel-midnightblue panel-bluegray panel-bluegraylight panel-black panel-gray panel-default panel-white panel-brown')
                    .addClass($(this).attr('data-style'));
                $(button).setWidgetState('headerStyle', $(this).attr('data-style'));
                e.stopPropagation();
            });
        }
    });

    $window.$.wijets.registerAction( {
      handle: "refresh-demo",
      html: '<span class="button-icon"><i class="ti ti-reload"></i></span>',
      onClick: function () {
        var params = $(this).data('actionParameters');
        var widget = $(this).closest('[data-widget]');
        widget.append('<div class="panel-loading"><div class="panel-loader-' + params.type + '"></div></div>');
        setTimeout( function () {
          widget.find('.panel-loading').remove();
        }, 2000);
      }
    });

    return $window.$.wijets;
  }])
  .factory('pinesNotifications', ['$window', function ($window) {
    'use strict';
    return {
      notify: function (args) {
        args.styling = 'fontawesome';
        args.mouse_reset = false;
        var notification = new $window.PNotify(args);
        notification.notify = notification.update;
        return notification;
      },
    };
  }])
  .factory('$bootbox', ['$modal', '$window', function($modal, $window) {
    'use strict';
    // NOTE: this is a workaround to make BootboxJS somewhat compatible with
    // Angular UI Bootstrap in the absence of regular bootstrap.js
    if (angular.element.fn.modal === undefined) {
      angular.element.fn.modal = function(directive) {
        var that = this;
        if (directive === 'hide') {
          if (this.data('bs.modal')) {
            this.data('bs.modal').close();
            angular.element(that).remove();
          }
          return;
        } else if (directive === 'show') {
          return;
        }

        var modalInstance = $modal.open({
          template: angular.element(this).find('.modal-content').html()
        });
        this.data('bs.modal', modalInstance);
        setTimeout(function() {
          angular.element('.modal.ng-isolate-scope').remove();
          angular.element(that).css({
            opacity: 1,
            display: 'block'
          }).addClass('in');
        }, 100);
      };
    }

    return $window.bootbox;
  }])
  .service('lazyLoad', ['$q', '$timeout', function($q, $t) {
    'use strict';
    var deferred = $q.defer();
    var promise = deferred.promise;
    this.load = function(files) {
      angular.forEach(files, function(file) {
        if (file.indexOf('.js') > -1) { // script
          (function(d, script) {
            var fDeferred = $q.defer();
            script = d.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.onload = function() {
              $t(function() {
                fDeferred.resolve();
              });
            };
            script.onerror = function() {
              $t(function() {
                fDeferred.reject();
              });
            };

            promise = promise.then(function() {
              script.src = file;
              d.getElementsByTagName('head')[0].appendChild(script);
              return fDeferred.promise;
            });
          }(document));
        }
      });

      deferred.resolve();

      return promise;
    };
  }])
  .filter('safe_html', ['$sce', function($sce) {
    'use strict';
    return function(val) {
      return $sce.trustAsHtml(val);
    };
  }]);
angular
  .module('theme.core.services')
  .service('$theme', ['$rootScope', 'EnquireService', '$document', function($rootScope, EnquireService, $document) {
    'use strict';
    this.settings = {
      fixedHeader: true,
      leftbarCollapsed: false,
      leftbarShown: false,
      extraBarShown: false,
      fullscreen: false,
      layoutHorizontal: false,
      layoutHorizontalLargeIcons: false,
      layoutBoxed: false,
      topNavThemeClass: window.localStorage['theme.settings.topNavThemeClass'] || 'navbar-bluegray',
      sidebarThemeClass: window.localStorage['theme.settings.sidebarThemeClass'] || 'sidebar-bluegray',
      pageTransitionStyle: 'fadeIn',
      dropdownTransitionStyle: 'fadeIn',
      showSmallSearchBar: false
    };

    var brandColors = {
      'default':      '#fafafa',
      'gray':         '#9e9e9e',

      'inverse':      '#757575',
      'primary':      '#03a9f4',
      'success':      '#8bc34a',
      'warning':      '#ffc107',
      'danger':       '#e51c23',
      'info':         '#00bcd4',
      
      'brown':        '#795548',
      'indigo':       '#3f51b5',
      'orange':       '#ff9800',
      'midnightblue': '#37474f',
      'teal':         '#009688',
      'pink':         '#e91e63',
      'purple':       '#9c27b0',
      'green':        '#4caf50',
      'deeppurple':   '#673ab7',
      'deeporange':   '#ff5722',
      'lime':         '#cddc39'
    };

    this.getBrandColor = function(name) {
      if (brandColors[name]) {
        return brandColors[name];
      } else {
        return brandColors['default'];
      }
    };

    $document.ready(function() {
      EnquireService.register('screen and (max-width: 767px)', {
        match: function() {
          $rootScope.$broadcast('themeEvent:maxWidth767', true);
        },
        unmatch: function() {
          $rootScope.$broadcast('themeEvent:maxWidth767', false);
        }
      });
    });

    this.get = function(key) {
      return this.settings[key];
    };
    this.set = function(key, value) {
      if (key == 'topNavThemeClass' || key == 'sidebarThemeClass') {
        window.localStorage['theme.settings.'+key] = value;
      }
      this.settings[key] = value;
      $rootScope.$broadcast('themeEvent:changed', {
        key: key,
        value: this.settings[key]
      });
      $rootScope.$broadcast('themeEvent:changed:' + key, this.settings[key]);
    };
    this.values = function() {
      return this.settings;
    };
  }]);
angular
  .module('theme', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngAnimate',
    'easypiechart',
    'NgSwitchery',
    'sun.scrollable',
    'ui.bootstrap',
    'ui.select',
    'theme.core.templates',
    'theme.core.template_overrides',
    'theme.core.directives',
    'theme.core.main_controller',
    'theme.core.navigation_controller',
    'theme.core.messages_controller',
    'theme.core.notifications_controller',
  ])
  .constant('nanoScrollerDefaults', {
    nanoClass: 'scroll-pane',
    paneClass: 'scroll-track',
    sliderClass: 'scroll-thumb',
    contentClass: 'scroll-content'
  })
  .run(['$window', function ($window) {
    $window.ngGrid.config = {
        footerRowHeight: 40,
        headerRowHeight: 40,
        rowHeight: 40
    };
  }]);


angular
  .module('theme.calendar', [])
  .directive('makeFullCalendar', ['$window', '$theme', function($window, $theme) {
    'use strict';
    return {
      restrict: 'A',
      scope: {
        options: '=makeFullCalendar',
        events: '=ngModel'
      },
      link: function(scope, element) {
        var calendar = {};
        var defaultOptions = angular.extend({
          header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
          },
          editable: true,
          eventLimit: true,
          events: scope.options.events,
          buttonText: {
            today:    'Today',
            month:    'Month',
            week:     'Week',
            day:      'Day'
          },
          buttonIcons: {
              prev: 'fa fa fa-angle-left',
              next: 'fa fa fa-angle-right',
              prevYear: 'fa fa fa-angle-double-left',
              nextYear: 'fa fa fa-angle-double-left'
          }
        }, scope.options);

        if (defaultOptions.droppable === true) {
          defaultOptions.drop = function(date, allDay) {
            var originalEventObject = angular.element(this).data('eventObject');
            var copiedEventObject = angular.element.extend({}, originalEventObject);
            copiedEventObject.start = date;
            copiedEventObject.allDay = allDay;
            calendar.fullCalendar('renderEvent', copiedEventObject, true);
            if (defaultOptions.removeDroppedEvent === true) {
              angular.element(this).remove();
            }
          };
        }

        calendar = $(element).html('').fullCalendar(defaultOptions);
      }
    }
  }])
  .directive('draggableEvent', function() {
    'use strict';
    return {
      restrict: 'A',
      scope: {
        eventDef: '=draggableEvent'
      },
      link: function(scope, element) {
        angular.element(element).draggable({
          zIndex: 999,
          revert: true,
          revertDuration: 0
        });
        angular.element(element).data('eventObject', scope.eventDef);
      }
    };
  });
angular
  .module('theme.chart.canvas', [])
  .directive('canvasChart', ['$window', function($window) {
    'use strict';
    return {
      restrict: 'EA',
      scope: {
        data: '=canvasChart',
        options: '=options',
        type: '=',
      },
      link: function(scope, element) {
        if ($window.Chart) {
          // console.log(element[0].getContext);
          (new $window.Chart(angular.element(element)[0].getContext('2d')))[scope.type](scope.data, scope.options);
        }
      }
    };
  }]);
angular
  .module('theme.chart.flot', [])
  .directive('flotChart', function() {
    'use strict';
    return {
      restrict: 'AE',
      scope: {
        data: '=flotData',
        options: '=flotOptions',
        plothover: '&plotHover',
        plotclick: '&plotClick'
      },
      link: function(scope, element) {
        var plot = angular.element.plot(angular.element(element), scope.data, scope.options);

        angular.element(element).bind('plothover', function(event, position, item) {
          scope.plothover({
            event: event,
            position: position,
            item: item
          });
        });

        angular.element(element).bind('plotclick', function(event, position, item) {
          scope.plotclick({
            event: event,
            position: position,
            item: item
          });
        });

        scope.$watch('data', function(newVal) {
          plot.setData(newVal);
          plot.setupGrid();
          plot.draw();
        });

        scope.$watch('options', function(newVal) {
          plot = angular.element.plot(angular.element(element), scope.data, newVal);
        }, true);
      }
    };
  });
angular
  .module('theme.chart.morris', [])
  .directive('svgChart', ['$window', function($window) {
    'use strict';
    return {
      restrict: 'EA',
      scope: {
        options: '=svgChart',
        type: '=',
      },
      link: function(scope, element, attr) {
        if ($window.Morris) {
          var elementId;
          if (!angular.element(element).attr('id')) {
            elementId = angular.element(element).attr('id', scope.type + attr.svgChart);
          } else {
            elementId = angular.element(element).attr('id');
          }
          $window.Morris[scope.type](angular.extend(scope.options, {
            element: elementId
          }));
        }
      }
    };
  }]);
angular
  .module('theme.chart.sparklines', [])
  .directive('sparklines', ['$timeout', function($timeout) {
    'use strict';
    return {
      restrict: 'A',
      scope: {
        options: '=sparklines',
        values: '=data'
      },
      link: function(scope, element, attr) {
        var options = {};
        if (scope.options) {
          options = angular.copy(scope.options);
        }
        var container = angular.element(element).closest('sparklines-composite');
        var target = element;
        if (container.length) {
          if (container.find('span.sparklines-container').length < 1) {
            container.append('<span class="sparklines-container"></span>');
          }
          target = container.find('span.sparklines-container');
          if (target.find('canvas').length) {
            options.composite = true;
            options.enableTagOptions = true;
          }
          if (attr.values) {
            target.attr('values', attr.values);
          } else {
            target.removeAttr('values');
          }
        }

        function sparklineIt() {
          if (scope.values) {
            angular.element(target).sparkline(scope.values, options);
          } else {
            angular.element(target).sparkline('html', options);
          }
        }

        // since the canvas will be invisible if the parent element is :\
        scope.$watch(function() {
          return element.is(':visible');
        }, function() {
          sparklineIt();
        });

        $timeout( function () {
          sparklineIt();
        }, 100);

        angular.element(window).on('resize', function () {
          sparklineIt();
        });
      }
    };
  }]);
angular
  .module('theme.gallery', [])
  .directive('gallery', function() {
    'use strict';
    return {
      restrict: 'A',
      scope: {
        filterClass: '@filterClass',
        sortClass: '@sortClass'
      },
      link: function(scope, element) {
        element.shuffle({
          itemSelector: '.item'
        });

        angular.element('.' + scope.filterClass).click(function(e) {
          e.preventDefault();
          angular.element('.' + scope.filterClass).removeClass('active');
          angular.element(this).addClass('active');
          var groupName = angular.element(this).attr('data-group');
          element.shuffle('shuffle', groupName);
        });
        angular.element('.' + scope.sortClass).click(function(e) {
          e.preventDefault();
          var opts = {
            reverse: angular.element(this).data('order') === 'desc',
            by: function(el) {
              return el.data(el.data('data-sort'));
            }
          };
          angular.element('.' + scope.sortClass).removeClass('active');
          angular.element(this).addClass('active');
          element.shuffle('sort', opts);
        });
      }
    };
  });
angular.module('theme.google_maps', [])
  .service('GMaps', ['$rootScope', '$window', function($rootScope, $window) {
    'use strict';
    this.new = function(options, instance) {
      var gmaps = new $window.GMaps(options);
      $rootScope.$broadcast('GMaps:created', {
        key: instance,
        map: gmaps
      });
    };
    this.newPanorama = function(options, instance) {
      var gmaps = $window.GMaps.createPanorama(options);
      $rootScope.$broadcast('GMaps:created', {
        key: instance,
        map: gmaps
      });
    };
  }])
  .directive('gmap', ['$timeout', 'GMaps', function($timeout, GMaps) {
    'use strict';
    return {
      restrict: 'A',
      scope: {
        options: '=',
        instance: '@'
      },
      link: function(scope, element, attr) {
        if (!attr.id) {
          attr.id = Math.random().toString(36).substring(7);
          element.attr('id', attr.id);
        }
        scope.options.el = '#' + attr.id;

        if (attr.panorama !== undefined) {
          GMaps.newPanorama(scope.options, scope.instance);
        } else {
          GMaps.new(scope.options, scope.instance);
        }
      }
    };
  }]);
angular.module('theme.vector_maps', [])
  .directive('jvectormap', ['$timeout', function($timeout) {
    'use strict';
    return {
      restrict: 'A',
      scope: {
        options: '=',
      },
      link: function(scope, element) {
        $timeout(function() {
          element.vectorMap(scope.options);
        });
      }
    };
  }]);
angular
	.module('theme.demos.basic_tables', [])
	.controller('TablesBasicController', ['$scope', function($scope) {
		'use strict';
		$scope.data = {
			headings: ['#', 'First Name', 'Last Name', 'Username'],
			rows: [
				['1', 'Mark', 'Otto', '@mdo'],
				['2', 'Jacob', 'Thornton', '@fat'],
				['3', 'Larry', 'the Bird', '@twitter']
			]
		};
	}]);
angular
  .module('theme.demos.boxed_layout', [
    'theme.core.services'
  ])
  .controller('BoxedPageController', ['$scope', '$theme', function($scope, $theme) {
    'use strict';
    $theme.set('layoutBoxed', true);

    $scope.$on('$destroy', function() {
      $theme.set('layoutBoxed', false);
    });
  }]);
angular.module('theme.demos.calendar', [
    'theme.core.services',
    'theme.calendar'
  ])
  .config(['$routeProvider', function($routeProvider) {
    'use strict';
    $routeProvider
      .when('/calendar', {
        templateUrl: 'views/calendar.html',
        resolve: {
          loadCalendar: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([
              'bower_components/fullcalendar/dist/fullcalendar.js'
            ]);
          }]
        }
      });
  }])
  .controller('CalendarController', ['$scope', '$theme', function($scope, $theme) {
    'use strict';
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $scope.demoEvents = [{
      title: 'All Day Event',
      start: new Date(y, m, 8),
      backgroundColor: $theme.getBrandColor('warning')
    }, {
      title: 'Long Event',
      start: new Date(y, m, d - 5),
      end: new Date(y, m, d - 2),
      backgroundColor: $theme.getBrandColor('success')
    }, {
      id: 999,
      title: 'Repeating Event',
      start: new Date(y, m, d - 3, 16, 0),
      allDay: false,
      backgroundColor: $theme.getBrandColor('primary')
    }, {
      id: 999,
      title: 'Repeating Event',
      start: new Date(y, m, d + 4, 16, 0),
      allDay: false,
      backgroundColor: $theme.getBrandColor('danger')
    }, {
      title: 'Meeting',
      start: new Date(y, m, d, 10, 30),
      allDay: false,
      backgroundColor: $theme.getBrandColor('info')
    }, {
      title: 'Lunch',
      start: new Date(y, m, d, 12, 0),
      end: new Date(y, m, d, 14, 0),
      allDay: false,
      backgroundColor: $theme.getBrandColor('midnightblue')
    }, {
      title: 'Birthday Party',
      start: new Date(y, m, d + 1, 19, 0),
      end: new Date(y, m, d + 1, 22, 30),
      allDay: false,
      backgroundColor: $theme.getBrandColor('primary')
    }, {
      title: 'Click for Google',
      start: new Date(y, m, 28),
      end: new Date(y, m, 29),
      url: 'http://google.com/',
      backgroundColor: $theme.getBrandColor('warning')
    }];

    $scope.events = [{
      title: 'Demo Event 1'
    }, {
      title: 'Demo Event 2'
    }, {
      title: 'Demo Event 2'
    }];
    $scope.addEvent = function() {
      $scope.events.push({
        title: $scope.newEvent
      });
      $scope.newEvent = '';
    };
  }]);
angular
  .module('theme.demos.canvas_charts', [
    'theme.chart.canvas'
  ])
  .config(['$routeProvider', function($routeProvider) {
    'use strict';
    $routeProvider
      .when('/charts-chartjs', {
        templateUrl: 'views/charts-chartjs.html',
        resolve: {
          loadChartsJs: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([
              'bower_components/Chart.js/Chart.min.js'
            ]);
          }]
        }
      });
  }])
  .controller('CanvasChartsController', ['$scope', function($scope) {
    'use strict';
    $scope.lineChartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        fillColor: 'rgba(220,220,220,0.5)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        pointStrokeColor: '#fff',
        data: [65, 59, 90, 81, 56, 55, 40]
      }, {
        fillColor: 'rgba(151,187,205,0.5)',
        strokeColor: 'rgba(151,187,205,1)',
        pointColor: 'rgba(151,187,205,1)',
        pointStrokeColor: '#fff',
        data: [28, 48, 40, 19, 96, 27, 100]
      }]
    };

    $scope.barChartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        fillColor: 'rgba(220,220,220,0.5)',
        strokeColor: 'rgba(220,220,220,1)',
        data: [65, 59, 90, 81, 56, 55, 40]
      }, {
        fillColor: 'rgba(151,187,205,0.5)',
        strokeColor: 'rgba(151,187,205,1)',
        data: [28, 48, 40, 19, 96, 27, 100]
      }]
    };

    $scope.radarChartData = {
      labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Partying', 'Running'],
      datasets: [{
        fillColor: 'rgba(220,220,220,0.5)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        pointStrokeColor: '#fff',
        data: [65, 59, 90, 81, 56, 55, 40]
      }, {
        fillColor: 'rgba(151,187,205,0.5)',
        strokeColor: 'rgba(151,187,205,1)',
        pointColor: 'rgba(151,187,205,1)',
        pointStrokeColor: '#fff',
        data: [28, 48, 40, 19, 96, 27, 100]
      }]
    };

    $scope.pieData = [{
      value: 30,
      color: '#F38630'
    }, {
      value: 50,
      color: '#E0E4CC'
    }, {
      value: 100,
      color: '#69D2E7'
    }];

    $scope.polarAreaData = [{
      value: Math.random(),
      color: '#D97041'
    }, {
      value: Math.random(),
      color: '#C7604C'
    }, {
      value: Math.random(),
      color: '#21323D'
    }, {
      value: Math.random(),
      color: '#9D9B7F'
    }, {
      value: Math.random(),
      color: '#7D4F6D'
    }, {
      value: Math.random(),
      color: '#584A5E'
    }];

    $scope.doughnutData = [{
      value: 30,
      color: '#F7464A'
    }, {
      value: 50,
      color: '#46BFBD'
    }, {
      value: 100,
      color: '#FDB45C'
    }, {
      value: 40,
      color: '#949FB1'
    }, {
      value: 120,
      color: '#4D5360'
    }];
  }]);
angular
  .module('theme.demos.chartist_charts', [
    'theme.chart.canvas'
  ])
  .controller('ChartistChartsController', ['$scope', function($scope) {
    'use strict';
    $scope.chartDefs = {};
    $scope.addChartDefinition = function (chartType, chartKey, chartData, chartOptions) {
      $scope.chartDefs[chartKey] = {
        chartType: chartType,
        chartData: chartData,
        chartOptions: chartOptions
      };
    };

    $scope.addChartDefinition('Line', 'ct-chart-line', {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      series: [
        [12, 9, 7, 8, 5],
        [2, 1, 3.5, 7, 3],
        [1, 3, 4, 5, 6]
      ]
    }, {
      fullWidth: true,
      chartPadding: {
        right: 40
      }
    });


    $scope.addChartDefinition('Line', 'ct-chart-holes', {
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      series: [
        [5, 5, 10, 8, 7, 5, 4, null, null, null, 10, 10, 7, 8, 6, 9],
        [10, 15, null, 12, null, 10, 12, 15, null, null, 12, null, 14, null, null, null],
        [null, null, null, null, 3, 4, 1, 3, 4,  6,  7,  9, 5, null, null, null]
      ]
    }, {
      fullWidth: true,
      chartPadding: {
        right: 10
      },
      low: 0
    });


    $scope.addChartDefinition('Line', 'ct-chart-area', {
      labels: [1, 2, 3, 4, 5, 6, 7, 8],
      series: [
        [5, 9, 7, 8, 5, 3, 5, 4]
      ]
    }, {
      fullWidth: true,
      low: 0,
      showArea: true
    });


    $scope.addChartDefinition('Line', 'ct-chart-bipolar', {
        labels: [1, 2, 3, 4, 5, 6, 7, 8],
        series: [
          [1, 2, 3, 1, -2, 0, 1, 0],
          [-2, -1, -2, -1, -2.5, -1, -2, -1],
          [0, 0, 0, 1, 2, 2.5, 2, 1],
          [2.5, 2, 1, 0.5, 1, 0.5, -1, -2.5]
        ]
      }, {
        high: 3,
        low: -3,
        showArea: true,
        showLine: false,
        showPoint: false,
        fullWidth: true,
        axisX: {
          showLabel: false,
          showGrid: false
        }
    });


    $scope.addChartDefinition('Bar', 'ct-chart-multiline', {
      labels: ['First quarter of the year', 'Second quarter of the year', 'Third quarter of the year', 'Fourth quarter of the year'],
      series: [
        [60000, 40000, 80000, 70000],
        [40000, 30000, 70000, 65000],
        [30000, 20000, 10000, 40000]
      ]
    }, {
      seriesBarDistance: 10,
      axisX: {
        offset: 60
      },
      axisY: {
        offset: 80,
        labelInterpolationFnc: function(value) {
          return value + ' CHF'
        },
        scaleMinSpace: 15
      }
    });


    $scope.addChartDefinition('Bar', 'ct-chart-stacked', {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      series: [
        [800000, 1200000, 1400000, 1300000],
        [200000, 400000, 500000, 300000],
        [100000, 200000, 400000, 600000]
      ]
    }, {
      stackBars: true,
      axisY: {
        labelInterpolationFnc: function(value) {
          return (value / 1000) + 'k';
        }
      }
    });

    $scope.addChartDefinition('Bar', 'ct-chart-horiz', {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      series: [
        [5, 4, 3, 7, 5, 10, 3],
        [3, 2, 9, 5, 4, 6, 4]
      ]
    }, {
      seriesBarDistance: 10,
      reverseData: true,
      horizontalBars: true,
      axisY: {
        offset: 70
      }
    });

    $scope.addChartDefinition('Bar', 'ct-chart-distributed', {
      labels: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      series: [20, 60, 120, 200, 180, 20, 10]
    }, {
      distributeSeries: true
    });


    var data = {
      series: [5, 3, 4]
    };

    var sum = function(a, b) { return a + b };

    $scope.addChartDefinition('Pie', 'ct-chart-pie', data, {
      labelInterpolationFnc: function(value) {
        return Math.round(value / data.series.reduce(sum) * 100) + '%';
      }
    });


    var data2 = {
      labels: ['Bananas', 'Apples', 'Grapes'],
      series: [20, 15, 40]
    };

    var options2 = {
      labelInterpolationFnc: function(value) {
        return value[0]
      }
    };

    var responsiveOptions2 = [
      ['screen and (min-width: 640px)', {
        chartPadding: 30,
        labelOffset: 100,
        labelDirection: 'explode',
        labelInterpolationFnc: function(value) {
          return value;
        }
      }],
      ['screen and (min-width: 1024px)', {
        labelOffset: 80,
        chartPadding: 20
      }]
    ];

    $scope.addChartDefinition('Pie', 'ct-chart-pie-labels', data2, options2, responsiveOptions2);


    $scope.addChartDefinition('Pie', 'ct-chart-gauge', {
      series: [20, 10, 30, 40]
    }, {
      donut: true,
      donutWidth: 60,
      startAngle: 270,
      total: 200,
      showLabel: false
    });

    console.log($scope.chartDefs);
  }]);
angular
  .module('theme.demos.nvd3_charts', [
    'nvd3ChartDirectives'
  ])
  .controller('Nvd3ChartsController', ['$scope', '$window', function($scope, $window) {
    'use strict';
    var d3 = $window.d3;
    $scope.lineChartData = [{
      'key': 'Series 1',
      'values': [
        [1025409600000, 0],
        [1028088000000, -6.3382185140371],
        [1030766400000, -5.9507873460847],
        [1033358400000, -11.569146943813],
        [1036040400000, -5.4767332317425],
        [1038632400000, 0.50794682203014],
        [1041310800000, -5.5310285460542],
        [1043989200000, -5.7838296963382],
        [1046408400000, -7.3249341615649],
        [1049086800000, -6.7078630712489],
        [1051675200000, 0.44227126150934],
        [1054353600000, 7.2481659343222],
        [1056945600000, 9.2512381306992],
        [1059624000000, 11.341210982529],
        [1062302400000, 14.734820409020],
        [1064894400000, 12.387148007542],
        [1067576400000, 18.436471461827],
        [1070168400000, 19.830742266977],
        [1072846800000, 22.643205829887],
        [1075525200000, 26.743156781239],
        [1078030800000, 29.597478802228],
        [1080709200000, 30.831697585341],
        [1083297600000, 28.054068024708],
        [1085976000000, 29.294079423832],
        [1088568000000, 30.269264061274],
        [1091246400000, 24.934526898906],
        [1093924800000, 24.265982759406],
        [1096516800000, 27.217794897473],
        [1099195200000, 30.802601992077],
        [1101790800000, 36.331003758254],
        [1104469200000, 43.142498700060],
        [1107147600000, 40.558263931958],
        [1109566800000, 42.543622385800],
        [1112245200000, 41.683584710331],
        [1114833600000, 36.375367302328],
        [1117512000000, 40.719688980730],
        [1120104000000, 43.897963036919],
        [1122782400000, 49.797033975368],
        [1125460800000, 47.085993935989],
        [1128052800000, 46.601972859745],
        [1130734800000, 41.567784572762],
        [1133326800000, 47.296923737245],
        [1136005200000, 47.642969612080],
        [1138683600000, 50.781515820954],
        [1141102800000, 52.600229204305],
        [1143781200000, 55.599684490628],
        [1146369600000, 57.920388436633],
        [1149048000000, 53.503593218971],
        [1151640000000, 53.522973979964],
        [1154318400000, 49.846822298548],
        [1156996800000, 54.721341614650],
        [1159588800000, 58.186236223191],
        [1162270800000, 63.908065540997],
        [1164862800000, 69.767285129367],
        [1167541200000, 72.534013373592],
        [1170219600000, 77.991819436573],
        [1172638800000, 78.143584404990],
        [1175313600000, 83.702398665233],
        [1177905600000, 91.140859312418],
        [1180584000000, 98.590960607028],
        [1183176000000, 96.245634754228],
        [1185854400000, 92.326364432615],
        [1188532800000, 97.068765332230],
        [1191124800000, 105.81025556260],
        [1193803200000, 114.38348777791],
        [1196398800000, 103.59604949810],
        [1199077200000, 101.72488429307],
        [1201755600000, 89.840147735028],
        [1204261200000, 86.963597532664],
        [1206936000000, 84.075505208491],
        [1209528000000, 93.170105645831],
        [1212206400000, 103.62838083121],
        [1214798400000, 87.458241365091],
        [1217476800000, 85.808374141319],
        [1220155200000, 93.158054469193],
        [1222747200000, 65.973252382360],
        [1225425600000, 44.580686638224],
        [1228021200000, 36.418977140128],
        [1230699600000, 38.727678144761],
        [1233378000000, 36.692674173387],
        [1235797200000, 30.033022809480],
        [1238472000000, 36.707532162718],
        [1241064000000, 52.191457688389],
        [1243742400000, 56.357883979735],
        [1246334400000, 57.629002180305],
        [1249012800000, 66.650985790166],
        [1251691200000, 70.839243432186],
        [1254283200000, 78.731998491499],
        [1256961600000, 72.375528540349],
        [1259557200000, 81.738387881630],
        [1262235600000, 87.539792394232],
        [1264914000000, 84.320762662273],
        [1267333200000, 90.621278391889],
        [1270008000000, 102.47144881651],
        [1272600000000, 102.79320353429],
        [1275278400000, 90.529736050479],
        [1277870400000, 76.580859994531],
        [1280548800000, 86.548979376972],
        [1283227200000, 81.879653334089],
        [1285819200000, 101.72550015956],
        [1288497600000, 107.97964852260],
        [1291093200000, 106.16240630785],
        [1293771600000, 114.84268599533],
        [1296450000000, 121.60793322282],
        [1298869200000, 133.41437346605],
        [1301544000000, 125.46646042904],
        [1304136000000, 129.76784954301],
        [1306814400000, 128.15798861044],
        [1309406400000, 121.92388706072],
        [1312084800000, 116.70036100870],
        [1314763200000, 88.367701837033],
        [1317355200000, 59.159665765725],
        [1320033600000, 79.793568139753],
        [1322629200000, 75.903834028417],
        [1325307600000, 72.704218209157],
        [1327986000000, 84.936990804097],
        [1330491600000, 93.388148670744]
      ]
    }];

    $scope.cumulativeLineChartData = [{
      'key': 'Series 1',
      'values': [
        [1025409600000, 0],
        [1028088000000, -6.3382185140371],
        [1030766400000, -5.9507873460847],
        [1033358400000, -11.569146943813],
        [1036040400000, -5.4767332317425],
        [1038632400000, 0.50794682203014],
        [1041310800000, -5.5310285460542],
        [1043989200000, -5.7838296963382],
        [1046408400000, -7.3249341615649],
        [1049086800000, -6.7078630712489],
        [1051675200000, 0.44227126150934],
        [1054353600000, 7.2481659343222],
        [1056945600000, 9.2512381306992],
        [1059624000000, 11.341210982529],
        [1062302400000, 14.734820409020],
        [1064894400000, 12.387148007542],
        [1067576400000, 18.436471461827],
        [1070168400000, 19.830742266977],
        [1072846800000, 22.643205829887],
        [1075525200000, 26.743156781239],
        [1078030800000, 29.597478802228],
        [1080709200000, 30.831697585341],
        [1083297600000, 28.054068024708],
        [1085976000000, 29.294079423832],
        [1088568000000, 30.269264061274],
        [1091246400000, 24.934526898906],
        [1093924800000, 24.265982759406],
        [1096516800000, 27.217794897473],
        [1099195200000, 30.802601992077],
        [1101790800000, 36.331003758254],
        [1104469200000, 43.142498700060],
        [1107147600000, 40.558263931958],
        [1109566800000, 42.543622385800],
        [1112245200000, 41.683584710331],
        [1114833600000, 36.375367302328],
        [1117512000000, 40.719688980730],
        [1120104000000, 43.897963036919],
        [1122782400000, 49.797033975368],
        [1125460800000, 47.085993935989],
        [1128052800000, 46.601972859745],
        [1130734800000, 41.567784572762],
        [1133326800000, 47.296923737245],
        [1136005200000, 47.642969612080],
        [1138683600000, 50.781515820954],
        [1141102800000, 52.600229204305],
        [1143781200000, 55.599684490628],
        [1146369600000, 57.920388436633],
        [1149048000000, 53.503593218971],
        [1151640000000, 53.522973979964],
        [1154318400000, 49.846822298548],
        [1156996800000, 54.721341614650],
        [1159588800000, 58.186236223191],
        [1162270800000, 63.908065540997],
        [1164862800000, 69.767285129367],
        [1167541200000, 72.534013373592],
        [1170219600000, 77.991819436573],
        [1172638800000, 78.143584404990],
        [1175313600000, 83.702398665233],
        [1177905600000, 91.140859312418],
        [1180584000000, 98.590960607028],
        [1183176000000, 96.245634754228],
        [1185854400000, 92.326364432615],
        [1188532800000, 97.068765332230],
        [1191124800000, 105.81025556260],
        [1193803200000, 114.38348777791],
        [1196398800000, 103.59604949810],
        [1199077200000, 101.72488429307],
        [1201755600000, 89.840147735028],
        [1204261200000, 86.963597532664],
        [1206936000000, 84.075505208491],
        [1209528000000, 93.170105645831],
        [1212206400000, 103.62838083121],
        [1214798400000, 87.458241365091],
        [1217476800000, 85.808374141319],
        [1220155200000, 93.158054469193],
        [1222747200000, 65.973252382360],
        [1225425600000, 44.580686638224],
        [1228021200000, 36.418977140128],
        [1230699600000, 38.727678144761],
        [1233378000000, 36.692674173387],
        [1235797200000, 30.033022809480],
        [1238472000000, 36.707532162718],
        [1241064000000, 52.191457688389],
        [1243742400000, 56.357883979735],
        [1246334400000, 57.629002180305],
        [1249012800000, 66.650985790166],
        [1251691200000, 70.839243432186],
        [1254283200000, 78.731998491499],
        [1256961600000, 72.375528540349],
        [1259557200000, 81.738387881630],
        [1262235600000, 87.539792394232],
        [1264914000000, 84.320762662273],
        [1267333200000, 90.621278391889],
        [1270008000000, 102.47144881651],
        [1272600000000, 102.79320353429],
        [1275278400000, 90.529736050479],
        [1277870400000, 76.580859994531],
        [1280548800000, 86.548979376972],
        [1283227200000, 81.879653334089],
        [1285819200000, 101.72550015956],
        [1288497600000, 107.97964852260],
        [1291093200000, 106.16240630785],
        [1293771600000, 114.84268599533],
        [1296450000000, 121.60793322282],
        [1298869200000, 133.41437346605],
        [1301544000000, 125.46646042904],
        [1304136000000, 129.76784954301],
        [1306814400000, 128.15798861044],
        [1309406400000, 121.92388706072],
        [1312084800000, 116.70036100870],
        [1314763200000, 88.367701837033],
        [1317355200000, 59.159665765725],
        [1320033600000, 79.793568139753],
        [1322629200000, 75.903834028417],
        [1325307600000, 72.704218209157],
        [1327986000000, 84.936990804097],
        [1330491600000, 93.388148670744]
      ]
    }, {
      'key': 'Series 2',
      'values': [
        [1025409600000, 0],
        [1028088000000, 0],
        [1030766400000, 0],
        [1033358400000, 0],
        [1036040400000, 0],
        [1038632400000, 0],
        [1041310800000, 0],
        [1043989200000, 0],
        [1046408400000, 0],
        [1049086800000, 0],
        [1051675200000, 0],
        [1054353600000, 0],
        [1056945600000, 0],
        [1059624000000, 0],
        [1062302400000, 0],
        [1064894400000, 0],
        [1067576400000, 0],
        [1070168400000, 0],
        [1072846800000, 0],
        [1075525200000, -0.049184266875945],
        [1078030800000, -0.10757569491991],
        [1080709200000, -0.075601531307242],
        [1083297600000, -0.061245277988149],
        [1085976000000, -0.068227316401169],
        [1088568000000, -0.11242758058502],
        [1091246400000, -0.074848439408270],
        [1093924800000, -0.11465623676497],
        [1096516800000, -0.24370633342416],
        [1099195200000, -0.21523268478893],
        [1101790800000, -0.37859370911822],
        [1104469200000, -0.41932884345151],
        [1107147600000, -0.45393735984802],
        [1109566800000, -0.50868179522598],
        [1112245200000, -0.48164396881207],
        [1114833600000, -0.41605962887194],
        [1117512000000, -0.48490348490240],
        [1120104000000, -0.55071036101311],
        [1122782400000, -0.67489170505394],
        [1125460800000, -0.74978070939342],
        [1128052800000, -0.86395050745343],
        [1130734800000, -0.78524898506764],
        [1133326800000, -0.99800440950854],
        [1136005200000, -1.1177951153878],
        [1138683600000, -1.4119975432964],
        [1141102800000, -1.2409959736465],
        [1143781200000, -1.3088936375431],
        [1146369600000, -1.5495785469683],
        [1149048000000, -1.1563414981293],
        [1151640000000, -0.87192471725994],
        [1154318400000, -0.84073995183442],
        [1156996800000, -0.88761892867370],
        [1159588800000, -0.81748513917485],
        [1162270800000, -1.2874081041274],
        [1164862800000, -1.9234702981339],
        [1167541200000, -1.8377768147648],
        [1170219600000, -2.7107654031830],
        [1172638800000, -2.6493268125418],
        [1175313600000, -3.0814553134551],
        [1177905600000, -3.8509837783574],
        [1180584000000, -5.2919167850718],
        [1183176000000, -5.2297750650773],
        [1185854400000, -3.9335668501451],
        [1188532800000, -2.3695525190114],
        [1191124800000, -2.3084243151854],
        [1193803200000, -3.0753680726738],
        [1196398800000, -2.2346609938962],
        [1199077200000, -3.0598810361615],
        [1201755600000, -1.8410154270386],
        [1204261200000, -1.6479442038620],
        [1206936000000, -1.9293858622780],
        [1209528000000, -3.0769590460943],
        [1212206400000, -4.2423933501421],
        [1214798400000, -2.6951491617768],
        [1217476800000, -2.8981825939957],
        [1220155200000, -2.9662727940324],
        [1222747200000, 0.21556750497498],
        [1225425600000, 2.6784995167088],
        [1228021200000, 4.1296711248958],
        [1230699600000, 3.7311068218734],
        [1233378000000, 4.7695330866954],
        [1235797200000, 5.1919133040990],
        [1238472000000, 4.1025856045660],
        [1241064000000, 2.8498939666225],
        [1243742400000, 2.8106017222851],
        [1246334400000, 2.8456526669963],
        [1249012800000, 0.65563070754298],
        [1251691200000, -0.30022343874633],
        [1254283200000, -1.1600358228964],
        [1256961600000, -0.26674408835052],
        [1259557200000, -1.4693389757812],
        [1262235600000, -2.7855421590594],
        [1264914000000, -1.2668244065703],
        [1267333200000, -2.5537804115548],
        [1270008000000, -4.9144552474502],
        [1272600000000, -6.0484408234831],
        [1275278400000, -3.3834349033750],
        [1277870400000, -0.46752826932523],
        [1280548800000, -1.8030186027963],
        [1283227200000, -0.99623230097881],
        [1285819200000, -3.3475370235594],
        [1288497600000, -3.8187026520342],
        [1291093200000, -4.2354146250353],
        [1293771600000, -5.6795404292885],
        [1296450000000, -6.2928665328172],
        [1298869200000, -6.8549277434419],
        [1301544000000, -6.9925308360918],
        [1304136000000, -8.3216548655839],
        [1306814400000, -7.7682867271435],
        [1309406400000, -6.9244213301058],
        [1312084800000, -5.7407624451404],
        [1314763200000, -2.1813149077927],
        [1317355200000, 2.9407596325999],
        [1320033600000, -1.1130607112134],
        [1322629200000, -2.0274822307752],
        [1325307600000, -1.8372559072154],
        [1327986000000, -4.0732815531148],
        [1330491600000, -6.4417038470291]
      ]
    }, {
      'key': 'Series 3',
      'values': [
        [1025409600000, 0],
        [1028088000000, -6.3382185140371],
        [1030766400000, -5.9507873460847],
        [1033358400000, -11.569146943813],
        [1036040400000, -5.4767332317425],
        [1038632400000, 0.50794682203014],
        [1041310800000, -5.5310285460542],
        [1043989200000, -5.7838296963382],
        [1046408400000, -7.3249341615649],
        [1049086800000, -6.7078630712489],
        [1051675200000, 0.44227126150934],
        [1054353600000, 7.2481659343222],
        [1056945600000, 9.2512381306992],
        [1059624000000, 11.341210982529],
        [1062302400000, 14.734820409020],
        [1064894400000, 12.387148007542],
        [1067576400000, 18.436471461827],
        [1070168400000, 19.830742266977],
        [1072846800000, 22.643205829887],
        [1075525200000, 26.693972514363],
        [1078030800000, 29.489903107308],
        [1080709200000, 30.756096054034],
        [1083297600000, 27.992822746720],
        [1085976000000, 29.225852107431],
        [1088568000000, 30.156836480689],
        [1091246400000, 24.859678459498],
        [1093924800000, 24.151326522641],
        [1096516800000, 26.974088564049],
        [1099195200000, 30.587369307288],
        [1101790800000, 35.952410049136],
        [1104469200000, 42.723169856608],
        [1107147600000, 40.104326572110],
        [1109566800000, 42.034940590574],
        [1112245200000, 41.201940741519],
        [1114833600000, 35.959307673456],
        [1117512000000, 40.234785495828],
        [1120104000000, 43.347252675906],
        [1122782400000, 49.122142270314],
        [1125460800000, 46.336213226596],
        [1128052800000, 45.738022352292],
        [1130734800000, 40.782535587694],
        [1133326800000, 46.298919327736],
        [1136005200000, 46.525174496692],
        [1138683600000, 49.369518277658],
        [1141102800000, 51.359233230659],
        [1143781200000, 54.290790853085],
        [1146369600000, 56.370809889665],
        [1149048000000, 52.347251720842],
        [1151640000000, 52.651049262704],
        [1154318400000, 49.006082346714],
        [1156996800000, 53.833722685976],
        [1159588800000, 57.368751084016],
        [1162270800000, 62.620657436870],
        [1164862800000, 67.843814831233],
        [1167541200000, 70.696236558827],
        [1170219600000, 75.281054033390],
        [1172638800000, 75.494257592448],
        [1175313600000, 80.620943351778],
        [1177905600000, 87.289875534061],
        [1180584000000, 93.299043821956],
        [1183176000000, 91.015859689151],
        [1185854400000, 88.392797582470],
        [1188532800000, 94.699212813219],
        [1191124800000, 103.50183124741],
        [1193803200000, 111.30811970524],
        [1196398800000, 101.36138850420],
        [1199077200000, 98.665003256909],
        [1201755600000, 87.999132307989],
        [1204261200000, 85.315653328802],
        [1206936000000, 82.146119346213],
        [1209528000000, 90.093146599737],
        [1212206400000, 99.385987481068],
        [1214798400000, 84.763092203314],
        [1217476800000, 82.910191547323],
        [1220155200000, 90.191781675161],
        [1222747200000, 66.188819887335],
        [1225425600000, 47.259186154933],
        [1228021200000, 40.548648265024],
        [1230699600000, 42.458784966634],
        [1233378000000, 41.462207260082],
        [1235797200000, 35.224936113579],
        [1238472000000, 40.810117767284],
        [1241064000000, 55.041351655012],
        [1243742400000, 59.168485702020],
        [1246334400000, 60.474654847301],
        [1249012800000, 67.306616497709],
        [1251691200000, 70.539019993440],
        [1254283200000, 77.571962668603],
        [1256961600000, 72.108784451998],
        [1259557200000, 80.269048905849],
        [1262235600000, 84.754250235173],
        [1264914000000, 83.053938255703],
        [1267333200000, 88.067497980334],
        [1270008000000, 97.556993569060],
        [1272600000000, 96.744762710807],
        [1275278400000, 87.146301147104],
        [1277870400000, 76.113331725206],
        [1280548800000, 84.745960774176],
        [1283227200000, 80.883421033110],
        [1285819200000, 98.377963136001],
        [1288497600000, 104.16094587057],
        [1291093200000, 101.92699168281],
        [1293771600000, 109.16314556604],
        [1296450000000, 115.31506669000],
        [1298869200000, 126.55944572261],
        [1301544000000, 118.47392959295],
        [1304136000000, 121.44619467743],
        [1306814400000, 120.38970188330],
        [1309406400000, 114.99946573061],
        [1312084800000, 110.95959856356],
        [1314763200000, 86.186386929240],
        [1317355200000, 62.100425398325],
        [1320033600000, 78.680507428540],
        [1322629200000, 73.876351797642],
        [1325307600000, 70.866962301942],
        [1327986000000, 80.863709250982],
        [1330491600000, 86.946444823715]
      ]
    }, {
      'key': 'Series 4',
      'values': [
        [1025409600000, -7.0674410638835],
        [1028088000000, -14.663359292964],
        [1030766400000, -14.104393060540],
        [1033358400000, -23.114477037218],
        [1036040400000, -16.774256687841],
        [1038632400000, -11.902028464000],
        [1041310800000, -16.883038668422],
        [1043989200000, -19.104223676831],
        [1046408400000, -20.420523282736],
        [1049086800000, -19.660555051587],
        [1051675200000, -13.106911231646],
        [1054353600000, -8.2448460302143],
        [1056945600000, -7.0313058730976],
        [1059624000000, -5.1485118700389],
        [1062302400000, -3.0011028761469],
        [1064894400000, -4.1367265281467],
        [1067576400000, 1.5425209565025],
        [1070168400000, 2.7673533607299],
        [1072846800000, 7.7077114755360],
        [1075525200000, 9.7565015112434],
        [1078030800000, 11.396888609473],
        [1080709200000, 10.013964745578],
        [1083297600000, 8.0558890950562],
        [1085976000000, 9.6081966657458],
        [1088568000000, 11.918590426432],
        [1091246400000, 7.9945345523982],
        [1093924800000, 8.3201276776796],
        [1096516800000, 9.8283954846342],
        [1099195200000, 11.527125859650],
        [1101790800000, 16.413657596527],
        [1104469200000, 20.393798297928],
        [1107147600000, 17.456308413907],
        [1109566800000, 20.087778400999],
        [1112245200000, 17.988336990817],
        [1114833600000, 15.378490151331],
        [1117512000000, 19.474322935730],
        [1120104000000, 20.013851070354],
        [1122782400000, 24.749943726975],
        [1125460800000, 23.558710274826],
        [1128052800000, 24.558915040889],
        [1130734800000, 22.355860488034],
        [1133326800000, 27.138026265756],
        [1136005200000, 27.202220808591],
        [1138683600000, 31.219437344964],
        [1141102800000, 31.392355525125],
        [1143781200000, 33.373099232542],
        [1146369600000, 35.095277582309],
        [1149048000000, 30.923356507615],
        [1151640000000, 31.083717332561],
        [1154318400000, 31.290690671561],
        [1156996800000, 34.247769216679],
        [1159588800000, 37.411073177620],
        [1162270800000, 42.079177096411],
        [1164862800000, 44.978191659648],
        [1167541200000, 46.713271025310],
        [1170219600000, 49.203892437699],
        [1172638800000, 46.684723471826],
        [1175313600000, 48.385458973500],
        [1177905600000, 54.660197840305],
        [1180584000000, 60.311838415602],
        [1183176000000, 57.583282204682],
        [1185854400000, 52.425398898751],
        [1188532800000, 54.663538086985],
        [1191124800000, 60.181844325224],
        [1193803200000, 62.877219773621],
        [1196398800000, 55.760611512951],
        [1199077200000, 54.735280367784],
        [1201755600000, 45.495912959474],
        [1204261200000, 40.934919015876],
        [1206936000000, 40.303777633187],
        [1209528000000, 47.403740368773],
        [1212206400000, 49.951960898839],
        [1214798400000, 37.534590035098],
        [1217476800000, 36.405758293321],
        [1220155200000, 38.545373001858],
        [1222747200000, 26.106358664455],
        [1225425600000, 4.2658006768744],
        [1228021200000, -3.5517839867557],
        [1230699600000, -2.0878920761513],
        [1233378000000, -10.408879093829],
        [1235797200000, -19.924242196038],
        [1238472000000, -12.906491912782],
        [1241064000000, -3.9774866468346],
        [1243742400000, 1.0319171601402],
        [1246334400000, 1.3109350357718],
        [1249012800000, 9.1668309061935],
        [1251691200000, 13.121178985954],
        [1254283200000, 17.578680237511],
        [1256961600000, 14.971294355085],
        [1259557200000, 21.551327027338],
        [1262235600000, 24.592328423819],
        [1264914000000, 20.158087829555],
        [1267333200000, 24.135661929185],
        [1270008000000, 31.815205405903],
        [1272600000000, 34.389524768466],
        [1275278400000, 23.785555857522],
        [1277870400000, 17.082756649072],
        [1280548800000, 25.248007727100],
        [1283227200000, 19.415179069165],
        [1285819200000, 30.413636349327],
        [1288497600000, 35.357952964550],
        [1291093200000, 35.886413535859],
        [1293771600000, 45.003601951959],
        [1296450000000, 48.274893564020],
        [1298869200000, 53.562864914648],
        [1301544000000, 54.108274337412],
        [1304136000000, 58.618190111927],
        [1306814400000, 56.806793965598],
        [1309406400000, 54.135477252994],
        [1312084800000, 50.735258942442],
        [1314763200000, 42.208170945813],
        [1317355200000, 31.617916826724],
        [1320033600000, 46.492005006737],
        [1322629200000, 46.203116922145],
        [1325307600000, 47.541427643137],
        [1327986000000, 54.518998440993],
        [1330491600000, 61.099720234693]
      ]
    }];


    $scope.stackedAreaChartData = [{
      'key': 'Series 1',
      'values': [
        [1025409600000, 0],
        [1028088000000, -6.3382185140371],
        [1030766400000, -5.9507873460847],
        [1033358400000, -11.569146943813],
        [1036040400000, -5.4767332317425],
        [1038632400000, 0.50794682203014],
        [1041310800000, -5.5310285460542],
        [1043989200000, -5.7838296963382],
        [1046408400000, -7.3249341615649],
        [1049086800000, -6.7078630712489],
        [1051675200000, 0.44227126150934],
        [1054353600000, 7.2481659343222],
        [1056945600000, 9.2512381306992],
        [1059624000000, 11.341210982529],
        [1062302400000, 14.734820409020],
        [1064894400000, 12.387148007542],
        [1067576400000, 18.436471461827],
        [1070168400000, 19.830742266977],
        [1072846800000, 22.643205829887],
        [1075525200000, 26.743156781239],
        [1078030800000, 29.597478802228],
        [1080709200000, 30.831697585341],
        [1083297600000, 28.054068024708],
        [1085976000000, 29.294079423832],
        [1088568000000, 30.269264061274],
        [1091246400000, 24.934526898906],
        [1093924800000, 24.265982759406],
        [1096516800000, 27.217794897473],
        [1099195200000, 30.802601992077],
        [1101790800000, 36.331003758254],
        [1104469200000, 43.142498700060],
        [1107147600000, 40.558263931958],
        [1109566800000, 42.543622385800],
        [1112245200000, 41.683584710331],
        [1114833600000, 36.375367302328],
        [1117512000000, 40.719688980730],
        [1120104000000, 43.897963036919],
        [1122782400000, 49.797033975368],
        [1125460800000, 47.085993935989],
        [1128052800000, 46.601972859745],
        [1130734800000, 41.567784572762],
        [1133326800000, 47.296923737245],
        [1136005200000, 47.642969612080],
        [1138683600000, 50.781515820954],
        [1141102800000, 52.600229204305],
        [1143781200000, 55.599684490628],
        [1146369600000, 57.920388436633],
        [1149048000000, 53.503593218971],
        [1151640000000, 53.522973979964],
        [1154318400000, 49.846822298548],
        [1156996800000, 54.721341614650],
        [1159588800000, 58.186236223191],
        [1162270800000, 63.908065540997],
        [1164862800000, 69.767285129367],
        [1167541200000, 72.534013373592],
        [1170219600000, 77.991819436573],
        [1172638800000, 78.143584404990],
        [1175313600000, 83.702398665233],
        [1177905600000, 91.140859312418],
        [1180584000000, 98.590960607028],
        [1183176000000, 96.245634754228],
        [1185854400000, 92.326364432615],
        [1188532800000, 97.068765332230],
        [1191124800000, 105.81025556260],
        [1193803200000, 114.38348777791],
        [1196398800000, 103.59604949810],
        [1199077200000, 101.72488429307],
        [1201755600000, 89.840147735028],
        [1204261200000, 86.963597532664],
        [1206936000000, 84.075505208491],
        [1209528000000, 93.170105645831],
        [1212206400000, 103.62838083121],
        [1214798400000, 87.458241365091],
        [1217476800000, 85.808374141319],
        [1220155200000, 93.158054469193],
        [1222747200000, 65.973252382360],
        [1225425600000, 44.580686638224],
        [1228021200000, 36.418977140128],
        [1230699600000, 38.727678144761],
        [1233378000000, 36.692674173387],
        [1235797200000, 30.033022809480],
        [1238472000000, 36.707532162718],
        [1241064000000, 52.191457688389],
        [1243742400000, 56.357883979735],
        [1246334400000, 57.629002180305],
        [1249012800000, 66.650985790166],
        [1251691200000, 70.839243432186],
        [1254283200000, 78.731998491499],
        [1256961600000, 72.375528540349],
        [1259557200000, 81.738387881630],
        [1262235600000, 87.539792394232],
        [1264914000000, 84.320762662273],
        [1267333200000, 90.621278391889],
        [1270008000000, 102.47144881651],
        [1272600000000, 102.79320353429],
        [1275278400000, 90.529736050479],
        [1277870400000, 76.580859994531],
        [1280548800000, 86.548979376972],
        [1283227200000, 81.879653334089],
        [1285819200000, 101.72550015956],
        [1288497600000, 107.97964852260],
        [1291093200000, 106.16240630785],
        [1293771600000, 114.84268599533],
        [1296450000000, 121.60793322282],
        [1298869200000, 133.41437346605],
        [1301544000000, 125.46646042904],
        [1304136000000, 129.76784954301],
        [1306814400000, 128.15798861044],
        [1309406400000, 121.92388706072],
        [1312084800000, 116.70036100870],
        [1314763200000, 88.367701837033],
        [1317355200000, 59.159665765725],
        [1320033600000, 79.793568139753],
        [1322629200000, 75.903834028417],
        [1325307600000, 72.704218209157],
        [1327986000000, 84.936990804097],
        [1330491600000, 93.388148670744]
      ]
    }, {
      'key': 'Series 2',
      'values': [
        [1025409600000, 0],
        [1028088000000, 0],
        [1030766400000, 0],
        [1033358400000, 0],
        [1036040400000, 0],
        [1038632400000, 0],
        [1041310800000, 0],
        [1043989200000, 0],
        [1046408400000, 0],
        [1049086800000, 0],
        [1051675200000, 0],
        [1054353600000, 0],
        [1056945600000, 0],
        [1059624000000, 0],
        [1062302400000, 0],
        [1064894400000, 0],
        [1067576400000, 0],
        [1070168400000, 0],
        [1072846800000, 0],
        [1075525200000, -0.049184266875945],
        [1078030800000, -0.10757569491991],
        [1080709200000, -0.075601531307242],
        [1083297600000, -0.061245277988149],
        [1085976000000, -0.068227316401169],
        [1088568000000, -0.11242758058502],
        [1091246400000, -0.074848439408270],
        [1093924800000, -0.11465623676497],
        [1096516800000, -0.24370633342416],
        [1099195200000, -0.21523268478893],
        [1101790800000, -0.37859370911822],
        [1104469200000, -0.41932884345151],
        [1107147600000, -0.45393735984802],
        [1109566800000, -0.50868179522598],
        [1112245200000, -0.48164396881207],
        [1114833600000, -0.41605962887194],
        [1117512000000, -0.48490348490240],
        [1120104000000, -0.55071036101311],
        [1122782400000, -0.67489170505394],
        [1125460800000, -0.74978070939342],
        [1128052800000, -0.86395050745343],
        [1130734800000, -0.78524898506764],
        [1133326800000, -0.99800440950854],
        [1136005200000, -1.1177951153878],
        [1138683600000, -1.4119975432964],
        [1141102800000, -1.2409959736465],
        [1143781200000, -1.3088936375431],
        [1146369600000, -1.5495785469683],
        [1149048000000, -1.1563414981293],
        [1151640000000, -0.87192471725994],
        [1154318400000, -0.84073995183442],
        [1156996800000, -0.88761892867370],
        [1159588800000, -0.81748513917485],
        [1162270800000, -1.2874081041274],
        [1164862800000, -1.9234702981339],
        [1167541200000, -1.8377768147648],
        [1170219600000, -2.7107654031830],
        [1172638800000, -2.6493268125418],
        [1175313600000, -3.0814553134551],
        [1177905600000, -3.8509837783574],
        [1180584000000, -5.2919167850718],
        [1183176000000, -5.2297750650773],
        [1185854400000, -3.9335668501451],
        [1188532800000, -2.3695525190114],
        [1191124800000, -2.3084243151854],
        [1193803200000, -3.0753680726738],
        [1196398800000, -2.2346609938962],
        [1199077200000, -3.0598810361615],
        [1201755600000, -1.8410154270386],
        [1204261200000, -1.6479442038620],
        [1206936000000, -1.9293858622780],
        [1209528000000, -3.0769590460943],
        [1212206400000, -4.2423933501421],
        [1214798400000, -2.6951491617768],
        [1217476800000, -2.8981825939957],
        [1220155200000, -2.9662727940324],
        [1222747200000, 0.21556750497498],
        [1225425600000, 2.6784995167088],
        [1228021200000, 4.1296711248958],
        [1230699600000, 3.7311068218734],
        [1233378000000, 4.7695330866954],
        [1235797200000, 5.1919133040990],
        [1238472000000, 4.1025856045660],
        [1241064000000, 2.8498939666225],
        [1243742400000, 2.8106017222851],
        [1246334400000, 2.8456526669963],
        [1249012800000, 0.65563070754298],
        [1251691200000, -0.30022343874633],
        [1254283200000, -1.1600358228964],
        [1256961600000, -0.26674408835052],
        [1259557200000, -1.4693389757812],
        [1262235600000, -2.7855421590594],
        [1264914000000, -1.2668244065703],
        [1267333200000, -2.5537804115548],
        [1270008000000, -4.9144552474502],
        [1272600000000, -6.0484408234831],
        [1275278400000, -3.3834349033750],
        [1277870400000, -0.46752826932523],
        [1280548800000, -1.8030186027963],
        [1283227200000, -0.99623230097881],
        [1285819200000, -3.3475370235594],
        [1288497600000, -3.8187026520342],
        [1291093200000, -4.2354146250353],
        [1293771600000, -5.6795404292885],
        [1296450000000, -6.2928665328172],
        [1298869200000, -6.8549277434419],
        [1301544000000, -6.9925308360918],
        [1304136000000, -8.3216548655839],
        [1306814400000, -7.7682867271435],
        [1309406400000, -6.9244213301058],
        [1312084800000, -5.7407624451404],
        [1314763200000, -2.1813149077927],
        [1317355200000, 2.9407596325999],
        [1320033600000, -1.1130607112134],
        [1322629200000, -2.0274822307752],
        [1325307600000, -1.8372559072154],
        [1327986000000, -4.0732815531148],
        [1330491600000, -6.4417038470291]
      ]
    }, {
      'key': 'Series 3',
      'values': [
        [1025409600000, 0],
        [1028088000000, -6.3382185140371],
        [1030766400000, -5.9507873460847],
        [1033358400000, -11.569146943813],
        [1036040400000, -5.4767332317425],
        [1038632400000, 0.50794682203014],
        [1041310800000, -5.5310285460542],
        [1043989200000, -5.7838296963382],
        [1046408400000, -7.3249341615649],
        [1049086800000, -6.7078630712489],
        [1051675200000, 0.44227126150934],
        [1054353600000, 7.2481659343222],
        [1056945600000, 9.2512381306992],
        [1059624000000, 11.341210982529],
        [1062302400000, 14.734820409020],
        [1064894400000, 12.387148007542],
        [1067576400000, 18.436471461827],
        [1070168400000, 19.830742266977],
        [1072846800000, 22.643205829887],
        [1075525200000, 26.693972514363],
        [1078030800000, 29.489903107308],
        [1080709200000, 30.756096054034],
        [1083297600000, 27.992822746720],
        [1085976000000, 29.225852107431],
        [1088568000000, 30.156836480689],
        [1091246400000, 24.859678459498],
        [1093924800000, 24.151326522641],
        [1096516800000, 26.974088564049],
        [1099195200000, 30.587369307288],
        [1101790800000, 35.952410049136],
        [1104469200000, 42.723169856608],
        [1107147600000, 40.104326572110],
        [1109566800000, 42.034940590574],
        [1112245200000, 41.201940741519],
        [1114833600000, 35.959307673456],
        [1117512000000, 40.234785495828],
        [1120104000000, 43.347252675906],
        [1122782400000, 49.122142270314],
        [1125460800000, 46.336213226596],
        [1128052800000, 45.738022352292],
        [1130734800000, 40.782535587694],
        [1133326800000, 46.298919327736],
        [1136005200000, 46.525174496692],
        [1138683600000, 49.369518277658],
        [1141102800000, 51.359233230659],
        [1143781200000, 54.290790853085],
        [1146369600000, 56.370809889665],
        [1149048000000, 52.347251720842],
        [1151640000000, 52.651049262704],
        [1154318400000, 49.006082346714],
        [1156996800000, 53.833722685976],
        [1159588800000, 57.368751084016],
        [1162270800000, 62.620657436870],
        [1164862800000, 67.843814831233],
        [1167541200000, 70.696236558827],
        [1170219600000, 75.281054033390],
        [1172638800000, 75.494257592448],
        [1175313600000, 80.620943351778],
        [1177905600000, 87.289875534061],
        [1180584000000, 93.299043821956],
        [1183176000000, 91.015859689151],
        [1185854400000, 88.392797582470],
        [1188532800000, 94.699212813219],
        [1191124800000, 103.50183124741],
        [1193803200000, 111.30811970524],
        [1196398800000, 101.36138850420],
        [1199077200000, 98.665003256909],
        [1201755600000, 87.999132307989],
        [1204261200000, 85.315653328802],
        [1206936000000, 82.146119346213],
        [1209528000000, 90.093146599737],
        [1212206400000, 99.385987481068],
        [1214798400000, 84.763092203314],
        [1217476800000, 82.910191547323],
        [1220155200000, 90.191781675161],
        [1222747200000, 66.188819887335],
        [1225425600000, 47.259186154933],
        [1228021200000, 40.548648265024],
        [1230699600000, 42.458784966634],
        [1233378000000, 41.462207260082],
        [1235797200000, 35.224936113579],
        [1238472000000, 40.810117767284],
        [1241064000000, 55.041351655012],
        [1243742400000, 59.168485702020],
        [1246334400000, 60.474654847301],
        [1249012800000, 67.306616497709],
        [1251691200000, 70.539019993440],
        [1254283200000, 77.571962668603],
        [1256961600000, 72.108784451998],
        [1259557200000, 80.269048905849],
        [1262235600000, 84.754250235173],
        [1264914000000, 83.053938255703],
        [1267333200000, 88.067497980334],
        [1270008000000, 97.556993569060],
        [1272600000000, 96.744762710807],
        [1275278400000, 87.146301147104],
        [1277870400000, 76.113331725206],
        [1280548800000, 84.745960774176],
        [1283227200000, 80.883421033110],
        [1285819200000, 98.377963136001],
        [1288497600000, 104.16094587057],
        [1291093200000, 101.92699168281],
        [1293771600000, 109.16314556604],
        [1296450000000, 115.31506669000],
        [1298869200000, 126.55944572261],
        [1301544000000, 118.47392959295],
        [1304136000000, 121.44619467743],
        [1306814400000, 120.38970188330],
        [1309406400000, 114.99946573061],
        [1312084800000, 110.95959856356],
        [1314763200000, 86.186386929240],
        [1317355200000, 62.100425398325],
        [1320033600000, 78.680507428540],
        [1322629200000, 73.876351797642],
        [1325307600000, 70.866962301942],
        [1327986000000, 80.863709250982],
        [1330491600000, 86.946444823715]
      ]
    }, {
      'key': 'Series 4',
      'values': [
        [1025409600000, -7.0674410638835],
        [1028088000000, -14.663359292964],
        [1030766400000, -14.104393060540],
        [1033358400000, -23.114477037218],
        [1036040400000, -16.774256687841],
        [1038632400000, -11.902028464000],
        [1041310800000, -16.883038668422],
        [1043989200000, -19.104223676831],
        [1046408400000, -20.420523282736],
        [1049086800000, -19.660555051587],
        [1051675200000, -13.106911231646],
        [1054353600000, -8.2448460302143],
        [1056945600000, -7.0313058730976],
        [1059624000000, -5.1485118700389],
        [1062302400000, -3.0011028761469],
        [1064894400000, -4.1367265281467],
        [1067576400000, 1.5425209565025],
        [1070168400000, 2.7673533607299],
        [1072846800000, 7.7077114755360],
        [1075525200000, 9.7565015112434],
        [1078030800000, 11.396888609473],
        [1080709200000, 10.013964745578],
        [1083297600000, 8.0558890950562],
        [1085976000000, 9.6081966657458],
        [1088568000000, 11.918590426432],
        [1091246400000, 7.9945345523982],
        [1093924800000, 8.3201276776796],
        [1096516800000, 9.8283954846342],
        [1099195200000, 11.527125859650],
        [1101790800000, 16.413657596527],
        [1104469200000, 20.393798297928],
        [1107147600000, 17.456308413907],
        [1109566800000, 20.087778400999],
        [1112245200000, 17.988336990817],
        [1114833600000, 15.378490151331],
        [1117512000000, 19.474322935730],
        [1120104000000, 20.013851070354],
        [1122782400000, 24.749943726975],
        [1125460800000, 23.558710274826],
        [1128052800000, 24.558915040889],
        [1130734800000, 22.355860488034],
        [1133326800000, 27.138026265756],
        [1136005200000, 27.202220808591],
        [1138683600000, 31.219437344964],
        [1141102800000, 31.392355525125],
        [1143781200000, 33.373099232542],
        [1146369600000, 35.095277582309],
        [1149048000000, 30.923356507615],
        [1151640000000, 31.083717332561],
        [1154318400000, 31.290690671561],
        [1156996800000, 34.247769216679],
        [1159588800000, 37.411073177620],
        [1162270800000, 42.079177096411],
        [1164862800000, 44.978191659648],
        [1167541200000, 46.713271025310],
        [1170219600000, 49.203892437699],
        [1172638800000, 46.684723471826],
        [1175313600000, 48.385458973500],
        [1177905600000, 54.660197840305],
        [1180584000000, 60.311838415602],
        [1183176000000, 57.583282204682],
        [1185854400000, 52.425398898751],
        [1188532800000, 54.663538086985],
        [1191124800000, 60.181844325224],
        [1193803200000, 62.877219773621],
        [1196398800000, 55.760611512951],
        [1199077200000, 54.735280367784],
        [1201755600000, 45.495912959474],
        [1204261200000, 40.934919015876],
        [1206936000000, 40.303777633187],
        [1209528000000, 47.403740368773],
        [1212206400000, 49.951960898839],
        [1214798400000, 37.534590035098],
        [1217476800000, 36.405758293321],
        [1220155200000, 38.545373001858],
        [1222747200000, 26.106358664455],
        [1225425600000, 4.2658006768744],
        [1228021200000, -3.5517839867557],
        [1230699600000, -2.0878920761513],
        [1233378000000, -10.408879093829],
        [1235797200000, -19.924242196038],
        [1238472000000, -12.906491912782],
        [1241064000000, -3.9774866468346],
        [1243742400000, 1.0319171601402],
        [1246334400000, 1.3109350357718],
        [1249012800000, 9.1668309061935],
        [1251691200000, 13.121178985954],
        [1254283200000, 17.578680237511],
        [1256961600000, 14.971294355085],
        [1259557200000, 21.551327027338],
        [1262235600000, 24.592328423819],
        [1264914000000, 20.158087829555],
        [1267333200000, 24.135661929185],
        [1270008000000, 31.815205405903],
        [1272600000000, 34.389524768466],
        [1275278400000, 23.785555857522],
        [1277870400000, 17.082756649072],
        [1280548800000, 25.248007727100],
        [1283227200000, 19.415179069165],
        [1285819200000, 30.413636349327],
        [1288497600000, 35.357952964550],
        [1291093200000, 35.886413535859],
        [1293771600000, 45.003601951959],
        [1296450000000, 48.274893564020],
        [1298869200000, 53.562864914648],
        [1301544000000, 54.108274337412],
        [1304136000000, 58.618190111927],
        [1306814400000, 56.806793965598],
        [1309406400000, 54.135477252994],
        [1312084800000, 50.735258942442],
        [1314763200000, 42.208170945813],
        [1317355200000, 31.617916826724],
        [1320033600000, 46.492005006737],
        [1322629200000, 46.203116922145],
        [1325307600000, 47.541427643137],
        [1327986000000, 54.518998440993],
        [1330491600000, 61.099720234693]
      ]
    }];

    $scope.multiBarChartData = [{
      'key': 'Series 1',
      'values': [
        [1025409600000, 0],
        [1028088000000, -6.3382185140371],
        [1030766400000, -5.9507873460847],
        [1033358400000, -11.569146943813],
        [1036040400000, -5.4767332317425],
        [1038632400000, 0.50794682203014],
        [1041310800000, -5.5310285460542],
        [1043989200000, -5.7838296963382],
        [1046408400000, -7.3249341615649],
        [1049086800000, -6.7078630712489],
        [1051675200000, 0.44227126150934],
        [1054353600000, 7.2481659343222],
        [1056945600000, 9.2512381306992]
      ]
    }, {
      'key': 'Series 2',
      'values': [
        [1025409600000, 0],
        [1028088000000, 0],
        [1030766400000, 0],
        [1033358400000, 0],
        [1036040400000, 0],
        [1038632400000, 0],
        [1041310800000, 0],
        [1043989200000, 0],
        [1046408400000, 0],
        [1049086800000, 0],
        [1051675200000, 0],
        [1054353600000, 0],
        [1056945600000, 0]
      ]
    }, {
      'key': 'Series 3',
      'values': [
        [1025409600000, 0],
        [1028088000000, -6.3382185140371],
        [1030766400000, -5.9507873460847],
        [1033358400000, -11.569146943813],
        [1036040400000, -5.4767332317425],
        [1038632400000, 0.50794682203014],
        [1041310800000, -5.5310285460542],
        [1043989200000, -5.7838296963382],
        [1046408400000, -7.3249341615649],
        [1049086800000, -6.7078630712489],
        [1051675200000, 0.44227126150934],
        [1054353600000, 7.2481659343222],
        [1056945600000, 9.2512381306992]
      ]
    }, {
      'key': 'Series 4',
      'values': [
        [1025409600000, -7.0674410638835],
        [1028088000000, -14.663359292964],
        [1030766400000, -14.104393060540],
        [1033358400000, -23.114477037218],
        [1036040400000, -16.774256687841],
        [1038632400000, -11.902028464000],
        [1041310800000, -16.883038668422],
        [1043989200000, -19.104223676831],
        [1046408400000, -20.420523282736],
        [1049086800000, -19.660555051587],
        [1051675200000, -13.106911231646],
        [1054353600000, -8.2448460302143],
        [1056945600000, -7.0313058730976]
      ]
    }];

    $scope.pieChartData = [{
      key: 'One',
      y: 5
    }, {
      key: 'Two',
      y: 2
    }, {
      key: 'Three',
      y: 9
    }, {
      key: 'Four',
      y: 7
    }, {
      key: 'Five',
      y: 4
    }, {
      key: 'Six',
      y: 3
    }, {
      key: 'Seven',
      y: 9
    }];

    $scope.discreteBarData = [{
      'key': 'Series 1',
      'values': [
        [1025409600000, 0],
        [1028088000000, -6.3382185140371],
        [1030766400000, -5.9507873460847],
        [1033358400000, -11.569146943813],
        [1036040400000, -5.4767332317425],
        [1038632400000, 0.50794682203014],
        [1041310800000, -5.5310285460542],
        [1043989200000, -5.7838296963382],
        [1046408400000, -7.3249341615649],
        [1049086800000, -6.7078630712489],
        [1051675200000, 0.44227126150934],
        [1054353600000, 7.2481659343222],
        [1056945600000, 9.2512381306992]
      ]
    }, {
      'key': 'Series 2',
      'values': [
        [1025409600000, 0],
        [1028088000000, 0],
        [1030766400000, 0],
        [1033358400000, 0],
        [1036040400000, 0],
        [1038632400000, 0],
        [1041310800000, 0],
        [1043989200000, 0],
        [1046408400000, 0],
        [1049086800000, 0],
        [1051675200000, 0],
        [1054353600000, 0],
        [1056945600000, 0]
      ]
    }, {
      'key': 'Series 3',
      'values': [
        [1025409600000, 0],
        [1028088000000, -6.3382185140371],
        [1030766400000, -5.9507873460847],
        [1033358400000, -11.569146943813],
        [1036040400000, -5.4767332317425],
        [1038632400000, 0.50794682203014],
        [1041310800000, -5.5310285460542],
        [1043989200000, -5.7838296963382],
        [1046408400000, -7.3249341615649],
        [1049086800000, -6.7078630712489],
        [1051675200000, 0.44227126150934],
        [1054353600000, 7.2481659343222],
        [1056945600000, 9.2512381306992]
      ]
    }, {
      'key': 'Series 4',
      'values': [
        [1025409600000, -7.0674410638835],
        [1028088000000, -14.663359292964],
        [1030766400000, -14.104393060540],
        [1033358400000, -23.114477037218],
        [1036040400000, -16.774256687841],
        [1038632400000, -11.902028464000],
        [1041310800000, -16.883038668422],
        [1043989200000, -19.104223676831],
        [1046408400000, -20.420523282736],
        [1049086800000, -19.660555051587],
        [1051675200000, -13.106911231646],
        [1054353600000, -8.2448460302143],
        [1056945600000, -7.0313058730976]
      ]
    }];

    $scope.scatterChartExampleData = [{
      'key': 'Group 0',
      'values': [{
        'x': 0.1905653578931545,
        'y': 0.8115218253543552,
        'size': 0.3461829945445061
      }, {
        'x': -0.47275546081985614,
        'y': -0.21250610156481783,
        'size': 0.7597237343434244
      }, {
        'x': -0.5943608400643436,
        'y': 0.48326260219425793,
        'size': 0.02735756477341056
      }, {
        'x': 0.4529497407477123,
        'y': -0.2613829468206304,
        'size': 0.946700036060065
      }, {
        'x': -0.7679040328935364,
        'y': -1.586936005594271,
        'size': 0.43301939661614597
      }, {
        'x': -1.5731902534071192,
        'y': -0.09195950915659948,
        'size': 0.4368209659587592
      }, {
        'x': 0.05553592818277685,
        'y': 1.742933013062792,
        'size': 0.8306681548710912
      }, {
        'x': 1.1877814988973527,
        'y': -1.3711119089602777,
        'size': 0.8269749800674617
      }, {
        'x': 0.3064363198255656,
        'y': -1.667839553436299,
        'size': 0.12198411440476775
      }, {
        'x': -1.8983536631939086,
        'y': -0.30140817421374505,
        'size': 0.9157399751711637
      }, {
        'x': 0.8488366723521106,
        'y': 1.295855799517563,
        'size': 0.962707610335201
      }, {
        'x': 0.04917381379553963,
        'y': 0.1181675943613078,
        'size': 0.6471372074447572
      }, {
        'x': 0.7289245491658888,
        'y': -1.437523544728938,
        'size': 0.11755557032302022
      }, {
        'x': 0.5629218945450293,
        'y': -0.006342726461880527,
        'size': 0.4649628330953419
      }, {
        'x': 0.8000392538355794,
        'y': -0.5021601017044044,
        'size': 0.6989645406138152
      }, {
        'x': -0.023370322333300483,
        'y': 1.1371358097794941,
        'size': 0.6258520961273462
      }, {
        'x': 0.7532529820424834,
        'y': -1.5173273652093129,
        'size': 0.8538876241073012
      }, {
        'x': 1.9112037262708281,
        'y': -0.9995548189037156,
        'size': 0.9963174634613097
      }, {
        'x': 0.9789011739485827,
        'y': -0.9841778566713231,
        'size': 0.7415103658568114
      }, {
        'x': -0.7347622707954421,
        'y': 0.4025962928769507,
        'size': 0.6174976546317339
      }, {
        'x': -0.5613983233476523,
        'y': 0.39581568123378746,
        'size': 0.26463790889829397
      }, {
        'x': -0.05388729078366278,
        'y': 0.6683711793675684,
        'size': 0.10974680096842349
      }, {
        'x': 1.6831239036269066,
        'y': -1.0049660895776276,
        'size': 0.24276677169837058
      }, {
        'x': 0.5270582634376473,
        'y': -0.5988214257540422,
        'size': 0.5567773135844618
      }, {
        'x': -0.5240116462616992,
        'y': 1.146009958570413,
        'size': 0.006196586648002267
      }, {
        'x': -0.20812125647497828,
        'y': 0.6996467377096869,
        'size': 0.7625449288170785
      }, {
        'x': 0.3697092607468307,
        'y': -0.561916499254294,
        'size': 0.8315129862166941
      }, {
        'x': 0.19189187887399817,
        'y': -0.2128728937328294,
        'size': 0.2983735257294029
      }, {
        'x': 0.7179505100531616,
        'y': 0.6074982425906404,
        'size': 0.9714579060673714
      }, {
        'x': -1.0258042397131446,
        'y': 0.028916435404879495,
        'size': 0.9255245921667665
      }, {
        'x': 0.049858130491165054,
        'y': 0.16023668632367177,
        'size': 0.24754037684760988
      }, {
        'x': -0.4480373145257009,
        'y': -0.6809428379549302,
        'size': 0.3886829293332994
      }, {
        'x': -2.2812991513382728,
        'y': -0.33079294312596536,
        'size': 0.9202477361541241
      }, {
        'x': 0.8451574891358427,
        'y': 0.7672813961466449,
        'size': 0.5153329856693745
      }, {
        'x': 0.9093939178973485,
        'y': -0.6761728190553149,
        'size': 0.782141275703907
      }, {
        'x': 2.1503140852060727,
        'y': -0.9199074184181212,
        'size': 0.18787955376319587
      }, {
        'x': -0.8493702928940353,
        'y': -1.9134660420041427,
        'size': 0.9342464371584356
      }, {
        'x': 1.8426928208903286,
        'y': -1.2276238838923101,
        'size': 0.7361447520088404
      }, {
        'x': -1.6394957638842569,
        'y': 1.1874215522015235,
        'size': 0.03339804639108479
      }, {
        'x': -0.16743144480987487,
        'y': -1.3360786878739637,
        'size': 0.17817910155281425
      }]
    }, {
      'key': 'Group 1',
      'values': [{
        'x': 1.4653418686067552,
        'y': 0.7410516592097678,
        'size': 0.9255829956382513
      }, {
        'x': -0.02877491536521995,
        'y': 0.5971477723050743,
        'size': 0.20799188618548214
      }, {
        'x': 0.39933969151296006,
        'y': -0.16091907790207202,
        'size': 0.5916927580256015
      }, {
        'x': 0.2577554231630996,
        'y': -0.9577460957918283,
        'size': 0.5138049270026386
      }, {
        'x': -2.3221649907829915,
        'y': -0.0044684970626760615,
        'size': 0.34789505670778453
      }, {
        'x': 0.2858384580920749,
        'y': -0.009337575343956525,
        'size': 0.393431298667565
      }, {
        'x': 0.9539376373228463,
        'y': -1.0195667080212654,
        'size': 0.7679041607771069
      }, {
        'x': -1.2227832080343977,
        'y': -1.6489586214792973,
        'size': 0.054216297809034586
      }, {
        'x': 1.9630250651259868,
        'y': 1.1245000954887443,
        'size': 0.5867844161111861
      }, {
        'x': 1.884517259998223,
        'y': 1.6812398769521144,
        'size': 0.7839774377644062
      }, {
        'x': 0.4978003737846926,
        'y': 0.32791831877531546,
        'size': 0.3412400826346129
      }, {
        'x': 1.2980681519712427,
        'y': -0.9952740390937576,
        'size': 0.7193699355702847
      }, {
        'x': 0.6754185913703837,
        'y': 0.22844385340707063,
        'size': 0.873178395209834
      }, {
        'x': 1.4494645607923515,
        'y': -1.705672177886205,
        'size': 0.7455916644539684
      }, {
        'x': -0.7068137433990378,
        'y': 0.18847005217283486,
        'size': 0.7337375746574253
      }, {
        'x': 1.5706659981551991,
        'y': 1.0527253721909164,
        'size': 0.09295836021192372
      }, {
        'x': -0.06658107171275701,
        'y': -0.3087956270025449,
        'size': 0.9809966967441142
      }, {
        'x': -0.14224623921701202,
        'y': -1.6443632071496772,
        'size': 0.17916848207823932
      }, {
        'x': 1.9763574284456442,
        'y': 0.20114669947357364,
        'size': 0.19338102429173887
      }, {
        'x': 0.23973168663622052,
        'y': 1.5275114516206054,
        'size': 0.2810874693095684
      }, {
        'x': 2.2351738911680545,
        'y': 1.5308557461376204,
        'size': 0.5739368079230189
      }, {
        'x': 1.1658679986403646,
        'y': -0.26037371791998476,
        'size': 0.49670674302615225
      }, {
        'x': -1.312531308445477,
        'y': -0.8949612980072548,
        'size': 0.1320240255445242
      }, {
        'x': 1.7924508296971744,
        'y': -1.3438146151836563,
        'size': 0.8639403055422008
      }, {
        'x': 0.20377494482335323,
        'y': -0.8884032400906033,
        'size': 0.9905917209107429
      }, {
        'x': -0.9757067613141938,
        'y': 0.18000624912547655,
        'size': 0.9214453566819429
      }, {
        'x': 1.2194473247237556,
        'y': 0.13489969143377384,
        'size': 0.5392275373451412
      }, {
        'x': 0.4551930087863704,
        'y': -1.4822357071529828,
        'size': 0.20265386765822768
      }, {
        'x': -1.1639984350312556,
        'y': 0.569236671724294,
        'size': 0.3443497116677463
      }, {
        'x': 0.1822464030561308,
        'y': -1.02897480186347,
        'size': 0.9934811990242451
      }, {
        'x': -1.0254650172012922,
        'y': -0.7122991375637777,
        'size': 0.5043953969143331
      }, {
        'x': -1.2079845135171494,
        'y': 0.5018439718253559,
        'size': 0.6343686871696264
      }, {
        'x': 0.6986798143581763,
        'y': -2.0794828492590036,
        'size': 0.7913787113502622
      }, {
        'x': 0.0688680999886745,
        'y': 0.15536282549168284,
        'size': 0.5813995015341789
      }, {
        'x': 2.120859697917862,
        'y': 0.16326612337506827,
        'size': 0.5073793663177639
      }, {
        'x': -0.18318639159436298,
        'y': -1.0732401746354177,
        'size': 0.47343171667307615
      }, {
        'x': 0.7916769280479292,
        'y': 0.5998659267873365,
        'size': 0.3798679707106203
      }, {
        'x': 0.7416571321746296,
        'y': 1.7255401124043879,
        'size': 0.9249286784324795
      }, {
        'x': -1.0942551743070383,
        'y': 0.06960216378412018,
        'size': 0.4393193630967289
      }, {
        'x': -0.541289245876714,
        'y': -1.597885890037399,
        'size': 0.27515286463312805
      }]
    }, {
      'key': 'Group 2',
      'values': [{
        'x': 0.0013830897746349158,
        'y': 0.8497943642692461,
        'size': 0.9310796288773417
      }, {
        'x': -0.9537010017212795,
        'y': -1.1938008511904343,
        'size': 0.05539561901241541
      }, {
        'x': -1.0580424236734207,
        'y': 2.139854471729741,
        'size': 0.48268040106631815
      }, {
        'x': 0.043968415027694996,
        'y': 0.8852129039510529,
        'size': 0.3477212116122246
      }, {
        'x': 1.7055412152062768,
        'y': -1.4348212323474745,
        'size': 0.9668007399886847
      }, {
        'x': 0.9397547265176092,
        'y': -0.07296315663759684,
        'size': 0.9410439992789179
      }, {
        'x': 0.19021526090792454,
        'y': -1.050431710977525,
        'size': 0.3422081198077649
      }, {
        'x': -0.7558508461125094,
        'y': -0.17196373499775727,
        'size': 0.8589865525718778
      }, {
        'x': 1.3230960643052652,
        'y': -0.30467315468255535,
        'size': 0.12701098946854472
      }, {
        'x': 0.6936077935982452,
        'y': 0.1318938865873131,
        'size': 0.9957166044041514
      }, {
        'x': 1.6703320017771062,
        'y': 0.5308740534459415,
        'size': 0.4085492135491222
      }, {
        'x': 0.44207870580275627,
        'y': -1.4216129350292004,
        'size': 0.02583820279687643
      }, {
        'x': -0.8134074836915618,
        'y': -0.7293792064439725,
        'size': 0.7247739909216762
      }, {
        'x': -0.8537353029899197,
        'y': -0.3225185548014425,
        'size': 0.2267512537073344
      }, {
        'x': -0.7570260272145507,
        'y': 0.6296645635708668,
        'size': 0.7163554567378014
      }, {
        'x': -1.3005577520013596,
        'y': 0.5712696513561867,
        'size': 0.2385872919112444
      }, {
        'x': -0.3334204242818808,
        'y': 0.9715187115163707,
        'size': 0.5692109528463334
      }, {
        'x': 1.7014370461449855,
        'y': -0.22032222972171522,
        'size': 0.8695793715305626
      }, {
        'x': 0.4257748777439921,
        'y': -0.8476442245049051,
        'size': 0.2962364540435374
      }, {
        'x': -0.9196942844561861,
        'y': 0.1777524451856555,
        'size': 0.1807089091744274
      }, {
        'x': 0.684877410380629,
        'y': 0.11358281964587866,
        'size': 0.48363478132523596
      }, {
        'x': -0.9653690828962243,
        'y': 1.084257902152799,
        'size': 0.5909544662572443
      }, {
        'x': 1.0021906064707191,
        'y': 0.4687644157812031,
        'size': 0.08420450799167156
      }, {
        'x': 0.19868249399559348,
        'y': 0.512297425314742,
        'size': 0.04527872730977833
      }, {
        'x': 0.4495942543923625,
        'y': 0.4444404960568513,
        'size': 0.730865828692913
      }, {
        'x': 1.1312832179369383,
        'y': 1.0741569702223284,
        'size': 0.14669232070446014
      }, {
        'x': 0.8767055401560964,
        'y': 0.3611417746890137,
        'size': 0.4741408482659608
      }, {
        'x': 0.7177360840981052,
        'y': 0.9733411454315484,
        'size': 0.6487463978119195
      }, {
        'x': -0.8636697487976036,
        'y': 0.02473410854710205,
        'size': 0.9049212939571589
      }, {
        'x': 1.1026897442162036,
        'y': -0.47535627454340473,
        'size': 0.609242383390665
      }, {
        'x': 1.9788844233723657,
        'y': 1.677322328944795,
        'size': 0.5720846657641232
      }, {
        'x': -0.618541599373511,
        'y': -0.2525322859960077,
        'size': 0.13546850928105414
      }, {
        'x': -0.4795570454831304,
        'y': 0.014939659798482703,
        'size': 0.5867933554109186
      }, {
        'x': 0.9751856013993968,
        'y': 0.607619141175016,
        'size': 0.7617681375704706
      }, {
        'x': -0.9698251505556951,
        'y': -0.1531499088650478,
        'size': 0.2151029680389911
      }, {
        'x': -1.1763935310215579,
        'y': -1.5342728392222162,
        'size': 0.5620931594166905
      }, {
        'x': -1.4277918519596748,
        'y': 0.18299499247162962,
        'size': 0.4493951094336808
      }, {
        'x': 1.0146951773124973,
        'y': 1.830509244426352,
        'size': 0.42843708232976496
      }, {
        'x': 0.32784779097601835,
        'y': -0.6130699568011613,
        'size': 0.2840911184903234
      }, {
        'x': 0.9711597717529307,
        'y': -0.666335396785633,
        'size': 0.6872496297582984
      }]
    }, {
      'key': 'Group 3',
      'values': [{
        'x': 0.08977024155251706,
        'y': -1.4315520281419063,
        'size': 0.6179190273396671
      }, {
        'x': 0.11861503770586883,
        'y': 0.23955359638861132,
        'size': 0.25821112329140306
      }, {
        'x': -1.0237018995145157,
        'y': -0.5612582258175013,
        'size': 0.1404807132203132
      }, {
        'x': -0.9393455408596457,
        'y': 0.6737660860684879,
        'size': 0.9703105506487191
      }, {
        'x': 0.19159941945806783,
        'y': -0.8725095986814769,
        'size': 0.43511714902706444
      }, {
        'x': 1.6895418516897702,
        'y': 0.32170365030040016,
        'size': 0.8828782043419778
      }, {
        'x': 0.4842324641678769,
        'y': 0.5980015980942737,
        'size': 0.8117240949068218
      }, {
        'x': -0.011520241595057892,
        'y': 0.1074086719509541,
        'size': 0.35458783572539687
      }, {
        'x': -0.9232625281509388,
        'y': -1.376116962711894,
        'size': 0.26924173487350345
      }, {
        'x': -0.3926740679388665,
        'y': -0.0295550635718949,
        'size': 0.2515628270339221
      }, {
        'x': 2.4368058157044747,
        'y': 0.039706999181704505,
        'size': 0.6724371737800539
      }, {
        'x': -0.778226535348631,
        'y': -0.5420294179019276,
        'size': 0.6696591766085476
      }, {
        'x': 0.43575488326559,
        'y': -1.6289687641589485,
        'size': 0.7544872206635773
      }, {
        'x': -0.9350993309515105,
        'y': -0.4299871079238853,
        'size': 0.33075249940156937
      }, {
        'x': -1.3349639378528069,
        'y': -0.9902733966955201,
        'size': 0.48540881695225835
      }, {
        'x': 1.0463873709302118,
        'y': 0.9913787826876077,
        'size': 0.46344535192474723
      }, {
        'x': -1.1659169289449973,
        'y': -0.7919918137042931,
        'size': 0.9375686913263053
      }, {
        'x': 0.35177493383903957,
        'y': 0.9961861752145466,
        'size': 0.7632603135425597
      }, {
        'x': 0.35935427207932147,
        'y': 0.09681568636522507,
        'size': 0.7000876346137375
      }, {
        'x': 1.0119497648455082,
        'y': -2.0703341139280584,
        'size': 0.6967110466212034
      }, {
        'x': 0.43727987594153844,
        'y': 1.089437345844744,
        'size': 0.6921922359615564
      }, {
        'x': 0.563560494620546,
        'y': 0.43695106324063826,
        'size': 0.1764467041939497
      }, {
        'x': -0.17456965716954997,
        'y': -0.6313026683183839,
        'size': 0.5587414605543017
      }, {
        'x': -0.4982717719483941,
        'y': 0.48206962378643803,
        'size': 0.08632022375240922
      }, {
        'x': -1.2962218417978628,
        'y': -1.8331266354981168,
        'size': 0.4631970210466534
      }, {
        'x': -2.105652340185991,
        'y': 0.5056854307641603,
        'size': 0.6298802183009684
      }, {
        'x': -0.43114178417645305,
        'y': 1.260106152531968,
        'size': 0.35635895072482526
      }, {
        'x': 1.0449334013812757,
        'y': -0.10920561629552844,
        'size': 0.4468745777849108
      }, {
        'x': -0.0026484543659800164,
        'y': 1.736775678549224,
        'size': 0.9011605640407652
      }, {
        'x': -2.188770011874295,
        'y': 0.9077936161185935,
        'size': 0.2698594289831817
      }, {
        'x': 0.06620643943859442,
        'y': -0.7800817998497923,
        'size': 0.5229832341428846
      }, {
        'x': -1.7312342213245897,
        'y': 1.1380057012854383,
        'size': 0.4515907093882561
      }, {
        'x': -0.6344667799977339,
        'y': 1.0257947236667349,
        'size': 0.8023789539001882
      }, {
        'x': -0.9968716208705127,
        'y': 1.1943450997461196,
        'size': 0.3913137000054121
      }, {
        'x': -0.3621400944751862,
        'y': 1.1329260567646853,
        'size': 0.36375453672371805
      }, {
        'x': 0.6069468363539295,
        'y': 0.741486280114601,
        'size': 0.7572341416962445
      }, {
        'x': 1.7001208652466078,
        'y': 0.5257025898762716,
        'size': 0.1023493716493249
      }, {
        'x': 0.4869822692301798,
        'y': 1.5157883876643072,
        'size': 0.45151000935584307
      }, {
        'x': 1.730883042571316,
        'y': -0.3508433909809182,
        'size': 0.6637827688828111
      }, {
        'x': 0.3333898462840203,
        'y': 0.017763190754013235,
        'size': 0.3088026640471071
      }]
    }];

    $scope.xAxisTickFormatScatterFunction = function() {
      return function(d) {
        return d3.format('d')(d);
      };
    };


    $scope.sparklineChartData = [
      [1025409600000, 0],
      [1028088000000, -6.3382185140371],
      [1030766400000, -5.9507873460847],
      [1033358400000, -11.569146943813],
      [1036040400000, -5.4767332317425],
      [1038632400000, 0.50794682203014],
      [1041310800000, -5.5310285460542],
      [1043989200000, -5.7838296963382],
      [1046408400000, -7.3249341615649],
      [1049086800000, -6.7078630712489],
      [1051675200000, 0.44227126150934],
      [1054353600000, 7.2481659343222],
      [1056945600000, 9.2512381306992],
      [1059624000000, 11.341210982529],
      [1062302400000, 14.734820409020],
      [1064894400000, 12.387148007542],
      [1067576400000, 18.436471461827],
      [1070168400000, 19.830742266977],
      [1072846800000, 22.643205829887],
      [1075525200000, 26.743156781239],
      [1078030800000, 29.597478802228],
      [1080709200000, 30.831697585341],
      [1083297600000, 28.054068024708],
      [1085976000000, 29.294079423832],
      [1088568000000, 30.269264061274],
      [1091246400000, 24.934526898906],
      [1093924800000, 24.265982759406],
      [1096516800000, 27.217794897473],
      [1099195200000, 30.802601992077],
      [1101790800000, 36.331003758254],
      [1104469200000, 43.142498700060],
      [1107147600000, 40.558263931958],
      [1109566800000, 42.543622385800],
      [1112245200000, 41.683584710331],
      [1114833600000, 36.375367302328],
      [1117512000000, 40.719688980730],
      [1120104000000, 43.897963036919],
      [1122782400000, 49.797033975368],
      [1125460800000, 47.085993935989],
      [1128052800000, 46.601972859745],
      [1130734800000, 41.567784572762],
      [1133326800000, 47.296923737245],
      [1136005200000, 47.642969612080],
      [1138683600000, 50.781515820954],
      [1141102800000, 52.600229204305],
      [1143781200000, 55.599684490628],
      [1146369600000, 57.920388436633],
      [1149048000000, 53.503593218971],
      [1151640000000, 53.522973979964],
      [1154318400000, 49.846822298548],
      [1156996800000, 54.721341614650],
      [1159588800000, 58.186236223191],
      [1162270800000, 63.908065540997],
      [1164862800000, 69.767285129367],
      [1167541200000, 72.534013373592],
      [1170219600000, 77.991819436573],
      [1172638800000, 78.143584404990],
      [1175313600000, 83.702398665233],
      [1177905600000, 91.140859312418],
      [1180584000000, 98.590960607028],
      [1183176000000, 96.245634754228],
      [1185854400000, 92.326364432615],
      [1188532800000, 97.068765332230],
      [1191124800000, 105.81025556260],
      [1193803200000, 114.38348777791],
      [1196398800000, 103.59604949810],
      [1199077200000, 101.72488429307],
      [1201755600000, 89.840147735028],
      [1204261200000, 86.963597532664],
      [1206936000000, 84.075505208491],
      [1209528000000, 93.170105645831],
      [1212206400000, 103.62838083121],
      [1214798400000, 87.458241365091],
      [1217476800000, 85.808374141319],
      [1220155200000, 93.158054469193],
      [1222747200000, 65.973252382360],
      [1225425600000, 44.580686638224],
      [1228021200000, 36.418977140128],
      [1230699600000, 38.727678144761],
      [1233378000000, 36.692674173387],
      [1235797200000, 30.033022809480],
      [1238472000000, 36.707532162718],
      [1241064000000, 52.191457688389],
      [1243742400000, 56.357883979735],
      [1246334400000, 57.629002180305],
      [1249012800000, 66.650985790166],
      [1251691200000, 70.839243432186],
      [1254283200000, 78.731998491499],
      [1256961600000, 72.375528540349],
      [1259557200000, 81.738387881630],
      [1262235600000, 87.539792394232],
      [1264914000000, 84.320762662273],
      [1267333200000, 90.621278391889],
      [1270008000000, 102.47144881651],
      [1272600000000, 102.79320353429],
      [1275278400000, 90.529736050479],
      [1277870400000, 76.580859994531],
      [1280548800000, 86.548979376972],
      [1283227200000, 81.879653334089],
      [1285819200000, 101.72550015956],
      [1288497600000, 107.97964852260],
      [1291093200000, 106.16240630785],
      [1293771600000, 114.84268599533],
      [1296450000000, 121.60793322282],
      [1298869200000, 133.41437346605],
      [1301544000000, 125.46646042904],
      [1304136000000, 129.76784954301],
      [1306814400000, 128.15798861044],
      [1309406400000, 121.92388706072],
      [1312084800000, 116.70036100870],
      [1314763200000, 88.367701837033],
      [1317355200000, 59.159665765725],
      [1320033600000, 79.793568139753],
      [1322629200000, 75.903834028417],
      [1325307600000, 72.704218209157],
      [1327986000000, 84.936990804097],
      [1330491600000, 93.388148670744]
    ];


    $scope.bulletChartData = {
      'title': 'Revenue',
      'subtitle': 'US$, in thousands',
      'ranges': [150, 225, 300],
      'measures': [220],
      'markers': [250]
    };


    $scope.xFunction = function() {
      return function(d) {
        return d.x;
      };
    };

    $scope.yFunction = function() {
      return function(d) {
        return d.y;
      };
    };

    $scope.xArrayFunction = function() {
      return function(d) {
        return d[0];
      };
    };

    $scope.yArrayFunction = function() {
      return function(d) {
        return d[1];
      };
    };

    $scope.xPieFunction = function() {
      return function(d) {
        return d.key;
      };
    };

    $scope.yPieFunction = function() {
      return function(d) {
        return d.y;
      };
    };

    $scope.xAxisTickFormatFunction = function() {
      return function(d) {
        return d3.time.format('%x')(new Date(d));
      };
    };

    $scope.xAxisTickFormatYearFunction = function() {
      return function(d) {
        return d3.time.format('%y')(new Date(d));
      };
    };

    $scope.xAxisTickFormatMonthFunction = function() {
      return function(d) {
        return d3.time.format('%b')(new Date(d));
      };
    };

    $scope.xAxisTickFormatFullYearFunction = function() {
      return function(d) {
        return d3.time.format('%Y')(new Date(d));
      };
    };

    $scope.yAxisTickFormatFunction = function() {
      return function(d) {
        return d3.format('d')(d);
      };
    };

    $scope.sparklineXFunction = function() {
      return function(d) {
        return d[0];
      };
    };

    $scope.sparklineYFunction = function() {
      return function(d) {
        return d[1];
      };
    };

  }]);
angular
  .module('theme.demos.chatbox', [])
  .controller('ChatRoomController', ['$scope', '$timeout', '$window', function($scope, $t, $window) {
    'use strict';
    var avatars = ['potter.png', 'tennant.png', 'johansson.png', 'jackson.png', 'jobs.png'];
    $scope.messages = [];
    $scope.userText = '';
    $scope.userTyping = false;
    $scope.userAvatar = 'johansson.png';
    $scope.cannedResponses = [
      'Go on...',
      'Why, thank you!',
      'I will let you know.'
    ];

    $scope.sendMessage = function(msg) {
      var im = {
        class: 'me',
        avatar: 'jackson.png',
        text: msg
      };
      this.messages.push(im);
      this.userText = '';

      $t(function() {
        $scope.userAvatar = $window._.shuffle(avatars).shift();
        $scope.userTyping = true;
      }, 500);

      $t(function() {
        var reply = $window._.shuffle($scope.cannedResponses).shift();
        var im = {
          class: 'chat-success',
          avatar: $scope.userAvatar,
          text: reply
        };
        $scope.userTyping = false;
        $scope.messages.push(im);
      }, 1200);
    };
  }]);
angular
  .module('theme.demos.editable_table', [])
  .controller('TablesEditableController', ['$scope', '$filter', function($scope, $filter) {
    'use strict';
    $scope.myData = [{
      name: 'Moroni',
      age: 50
    }, {
      name: 'Tiancum',
      age: 43
    }, {
      name: 'Jacob',
      age: 27
    }, {
      name: 'Nephi',
      age: 29
    }, {
      name: 'Enos',
      age: 34
    }];
    $scope.gridOptions = {
      data: 'myData',
      enableCellSelection: true,
      enableRowSelection: false,
      enableCellEditOnFocus: true,
      columnDefs: [{
        field: 'name',
        displayName: 'Name',
        enableCellEdit: true
      }, {
        field: 'age',
        displayName: 'Age',
        enableCellEdit: true
      }]
    };

    $scope.users = [{
      id: 1,
      name: 'awesome user1',
      status: 2,
      group: 4,
      groupName: 'admin'
    }, {
      id: 2,
      name: 'awesome user2',
      status: undefined,
      group: 3,
      groupName: 'vip'
    }, {
      id: 3,
      name: 'awesome user3',
      status: 2,
      group: null
    }];

    $scope.statuses = [{
      value: 1,
      text: 'status1'
    }, {
      value: 2,
      text: 'status2'
    }, {
      value: 3,
      text: 'status3'
    }, {
      value: 4,
      text: 'status4'
    }];

    $scope.groups = [{
      id: 1,
      text: 'MVP'
    }, {
      id: 2,
      text: 'VIP'
    }, {
      id: 3,
      text: 'ADMINS'
    }, {
      id: 4,
      text: 'USER'
    }];

    $scope.showGroup = function(user) {
      if (user.group && $scope.groups.length) {
        var selected = $filter('filter')($scope.groups, {
          id: user.group
        });
        return selected.length ? selected[0].text : 'Not set';
      } else {
        return user.groupName || 'Not set';
      }
    };

    $scope.showStatus = function(user) {
      var selected = [];
      if (user.status) {
        selected = $filter('filter')($scope.statuses, {
          value: user.status
        });
      }
      return selected.length ? selected[0].text : 'Not set';
    };

    $scope.saveUser = function(data, id) {
      //$scope.user not updated yet
      angular.extend(data, {
        id: id
      });
      // return $http.post('/saveUser', data);
    };

    // remove user
    $scope.removeUser = function(index) {
      $scope.users.splice(index, 1);
    };

    // add user
    $scope.addUser = function() {
      $scope.inserted = {
        id: $scope.users.length + 1,
        name: '',
        status: null,
        group: null
      };
      $scope.users.push($scope.inserted);
    };
  }]);
angular
  .module('theme.demos.flot_charts', [
    'theme.core.services',
    'theme.chart.flot'
  ])
  .controller('FlotChartsController', ['$scope', '$timeout', '$theme', function($scope, $timeout, $theme) {
    'use strict';
    var sin = [],
      cos = [];

    for (var i = 0; i < 14; i += 0.5) {
      sin.push([i, Math.sin(i)]);
      cos.push([i, Math.cos(i)]);
    }


    // Data Points

    $scope.sinusoidalData = [{
      data: sin,
      label: 'sin(x)/x'
    }, {
      data: cos,
      label: 'cos(x)'
    }];

    $scope.sinusoidalOptions = {
      series: {
        shadowSize: 0,
        lines: {
          show: true,
          lineWidth: 2
        },
        points: {
          show: true
        }
      },
      grid: {
        labelMargin: 10,
        hoverable: true,
        clickable: true,
        borderWidth: 1,
        borderColor: '#f5f5f5'
      },
      legend: {
        backgroundColor: '#fff'
      },
      yaxis: {
        min: -1.2,
        max: 1.2,
        tickColor: '#f5f5f5',
        font: {
          color: '#bdbdbd'
        }
      },
      xaxis: {
        tickColor: '#f5f5f5',
        font: {
          color: '#bdbdbd'
        }
      },
      colors: [$theme.getBrandColor('success'), $theme.getBrandColor('inverse')],
      tooltip: true,
      tooltipOpts: {
        content: 'x: %x, y: %y'
      }
    };

    $scope.sinusoidalOnClick = function() {
      // console.log(event, position, item);
    };
    $scope.sinusoidalOnHover = function() {
      // console.log(event, position, item);
    };

    // Multi Graphs in One

    var d1 = [];
    for (i = 0; i < 14; i += 0.1) {
      d1.push([i, Math.sin(i)]);
    }

    var d2 = [
      [0, 3],
      [4, 8],
      [8, 5],
      [9, 13]
    ];

    var d3 = [];
    for (i = 0; i < 15; i += 1) {
      d3.push([i, Math.cos(i) + 10]);
    }

    var d4 = [];
    for (i = 0; i < 14; i += 0.01) {
      d4.push([i, Math.sqrt(i * 10)]);
    }

    var d5 = [];
    for (i = 0; i < 15; i += 1) {
      d5.push([i, Math.sqrt(i)]);
    }

    var d6 = [];
    for (i = 0; i < 15; i += 1) {
      d6.push([i, Math.sqrt(5 * i + Math.sin(i) + 5)]);
    }

    $scope.multigraphData = [{
      data: d1,
      lines: {
        show: true,
        fill: 0.2,
        lineWidth: 1.5
      },
      shadowSize: 0
    }, {
      data: d2,
      bars: {
        show: true,
        fill: 0.2,
        lineWidth: 1.5
      },
      shadowSize: 0
    }, {
      data: d3,
      points: {
        show: true,
        fill: 0,
      },
      shadowSize: 0
    }, {
      data: d4,
      lines: {
        show: true,
        fill: 0,
        lineWidth: 1.5
      },
      shadowSize: 0
    }, {
      data: d5,
      lines: {
        show: true,
        fill: 0,
        lineWidth: 1.5
      },
      points: {
        show: true,
        fill: 0.2
      },
      shadowSize: 0
    }, {
      data: d6,
      lines: {
        show: true,
        steps: true,
        fill: 0.05,
        lineWidth: 1.5
      },
      shadowSize: 0
    }];
    $scope.multigraphOptions = {
      grid: {
        labelMargin: 10,
        hoverable: true,
        clickable: true,
        borderWidth: 1,
        borderColor: '#f5f5f5',
      },
      yaxis: {
        tickColor: '#f5f5f5',
        font: {
          color: '#bdbdbd'
        }
      },
      xaxis: {
        tickColor: '#f5f5f5',
        font: {
          color: '#bdbdbd'
        }
      },
      colors: [$theme.getBrandColor('midnightblue'), $theme.getBrandColor('danger'), $theme.getBrandColor('indigo'), $theme.getBrandColor('inverse'), $theme.getBrandColor('inverse'), $theme.getBrandColor('midnightblue')],
      tooltip: true,
      tooltipOpts: {
        content: 'x: %x, y: %y'
      }
    };

    var dxta = [],
      totalPoints = 300;
    var updateInterval = 150;

    function getRandomData() {
      if (dxta.length > 0) {
        dxta = dxta.slice(1);
      }

      while (dxta.length < totalPoints) {
        var prev = dxta.length > 0 ? dxta[dxta.length - 1] : 50,
          y = prev + Math.random() * 10 - 5;

        if (y < 0) {
          y = 0;
        } else if (y > 100) {
          y = 100;
        }

        dxta.push(y);
      }
      var res = [];
      for (i = 0; i < dxta.length; ++i) {
        res.push([i, dxta[i]]);
      }
      return res;
    }

    // Real Time Data

    $scope.realtimeData = [getRandomData()];
    $scope.realtimeOptions = {
      series: {
        lines: {
          show: true,
          lineWidth: 1.5,
          fill: 0.15,
          fillColor: {
            colors: [{
              opacity: 0.01
            }, {
              opacity: 0.3
            }]
          }
        },
        shadowSize: 0 // Drawing is faster without shadows
      },
      grid: {
        labelMargin: 10,
        hoverable: true,
        clickable: true,
        borderWidth: 1,
        borderColor: '#f5f5f5'
      },
      yaxis: {
        min: 0,
        max: 100,
        tickColor: '#f5f5f5',
        font: {
          color: '#bdbdbd'
        }
      },
      xaxis: {
        show: false
      },
      colors: ['#95a5a6'],
      tooltip: true,
      tooltipOpts: {
        content: 'CPU Utilization: %y%'
      }

    };

    var promise;
    var updateRealtimeData = function() {
      $scope.realtimeData = [getRandomData()];
      $timeout.cancel(promise);
      promise = $timeout(updateRealtimeData, updateInterval);
    };

    updateRealtimeData();

    // Stacking

    d1 = [];
    for (i = 0; i <= 10; i += 1) {
      d1.push([i, parseInt(Math.random() * 30)]);
    }
    d2 = [];
    for (i = 0; i <= 10; i += 1) {
      d2.push([i, parseInt(Math.random() * 30)]);
    }
    d3 = [];
    for (i = 0; i <= 10; i += 1) {
      d3.push([i, parseInt(Math.random() * 30)]);
    }

    $scope.stackedIsTrue = true;
    $scope.stackedBars = true;
    $scope.stackedLines = false;
    $scope.stackedSteps = false;

    var getStackedOptions = function() {
      return {
        series: {
          shadowSize: 0,
          stack: $scope.stackedIsTrue,
          lines: {
            show: $scope.stackedLines,
            fill: 0.2,
            lineWidth: 1.5,
            steps: $scope.stackedSteps,
          },
          bars: {
            show: $scope.stackedBars,
            barWidth: 0.3,
            lineWidth: 1.5
          }
        },
        grid: {
          labelMargin: 10,
          hoverable: true,
          clickable: true,
          borderWidth: 1,
          borderColor: '#f5f5f5'
        },
        yaxis: {
          tickColor: '#f5f5f5',
          font: {
            color: '#bdbdbd'
          }
        },
        xaxis: {
          tickColor: '#f5f5f5',
          font: {
            color: '#bdbdbd'
          }
        },
        colors: [$theme.getBrandColor('midnightblue'), $theme.getBrandColor('info'), $theme.getBrandColor('success')],
        tooltip: true,
        tooltipOpts: {
          content: 'X: %x | Y: %y'
        }
      };
    };

    $scope.setOption = function(type) {
      switch (type) {
        case 'Lines':
          $scope.stackedLines = true;
          $scope.stackedBars = false;
          $scope.stackedSteps = false;
          break;
        case 'Bars':
          $scope.stackedBars = true;
          $scope.stackedLines = false;
          $scope.stackedSteps = false;
          break;
        case 'Steps':
          $scope.stackedSteps = true;
          $scope.stackedBars = false;
          $scope.stackedLines = true;
          break;
        case 'Stack':
          $scope.stackedIsTrue = true;
          break;
        case 'Unstack':
          $scope.stackedIsTrue = false;
          break;
      }
      $scope.stackedOptions = getStackedOptions();
    };
    $scope.stackedOptions = getStackedOptions();
    $scope.stackedData = [d1, d2, d3];

    // Pie Chart

    $scope.pieData = [{
        label: 'Series1',
        data: 10,
        color: $theme.getBrandColor('danger')
      }, {
        label: 'Series2',
        data: 30,
        color: $theme.getBrandColor('warning')
      }, {
        label: 'Series3',
        data: 90,
        color: $theme.getBrandColor('midnightblue')
      }, {
        label: 'Series4',
        data: 70,
        color: $theme.getBrandColor('info')
      }, {
        label: 'Series5',
        data: 80,
        color: $theme.getBrandColor('success')
      }, {
        label: 'Series6',
        data: 110,
        color: $theme.getBrandColor('inverse')
      }

    ];

    $scope.pieOptions = {
      series: {
        pie: {
          show: true
        }
      },
      grid: {
        hoverable: true
      },
      tooltip: true,
      tooltipOpts: {
        content: '%p.0%, %s'
      }
    };

    $scope.donutOptions = {
      series: {
        pie: {
          innerRadius: 0.5,
          show: true
        }
      },
      grid: {
        hoverable: true
      },
      tooltip: true,
      tooltipOpts: {
        content: '%p.0%, %s'
      }
    };

    $scope.$on('$destroy', function() {
      $timeout.cancel(promise);
    });
  }]);
angular
  .module('theme.demos.forms', [
    'flow',
    'xeditable',
    'theme.core.directives',
    'theme.core.services'
  ])
  .config(['flowFactoryProvider', '$routeProvider', function(flowFactoryProvider, $routeProvider) {
    'use strict';
    flowFactoryProvider.defaults = {
      target: '',
      permanentErrors: [500, 501],
      maxChunkRetries: 1,
      chunkRetryInterval: 5000,
      simultaneousUploads: 1
    };
    flowFactoryProvider.on('catchAll', function(event) {
      console.log('catchAll', event);
    });

    $routeProvider
      .when('/form-imagecrop', {
        templateUrl: 'views/form-imagecrop.html',
        resolve: {
          loadJcrop: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([
              'assets/plugins/jcrop/js/jquery.Jcrop.min.js'
            ]);
          }]
        }
      })
      .when('/form-wizard', {
        templateUrl: 'views/form-wizard.html',
        resolve: {
          loadStepy: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([
              'bower_components/jquery-validation/dist/jquery.validate.js',
              'bower_components/stepy/lib/jquery.stepy.js'
            ]);
          }]
        }
      })
      .when('/form-masks', {
        templateUrl: 'views/form-masks.html',
        resolve: {
          loadMasks: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([
              'bower_components/jquery.inputmask/dist/jquery.inputmask.bundle.js'
            ]);
          }]
        }
      });
  }]);
angular
  .module('theme.demos.forms')
  .controller('AngularFormValidationController', ['$scope', function($scope) {
    'use strict';
    $scope.validateDemoForm = {};
    $scope.form = {};

    $scope.canResetValidationForm = function() {
      return $scope.form.validateDemoForm.$dirty;
    };

    $scope.resetValidationForm = function() {
      $scope.validateDemoForm.required = '';
      $scope.validateDemoForm.minlength = '';
      $scope.validateDemoForm.maxlength = '';
      $scope.validateDemoForm.rangelength = '';
      $scope.validateDemoForm.pattern = '';
      $scope.validateDemoForm.email = '';
      $scope.validateDemoForm.url = '';
      $scope.validateDemoForm.digits = '';
      $scope.validateDemoForm.digits_min = '';
      $scope.validateDemoForm.digits_max = '';
      $scope.validateDemoForm.digits_minmax = '';
      $scope.validateDemoForm.alphanumeric = '';
      $scope.validateDemoForm.password = '';
      $scope.validateDemoForm.confirm_password = '';
      $scope.validateDemoForm.terms = '';
      $scope.form.validateDemoForm.$setPristine();
    };

    $scope.canSubmitValidationForm = function() {
      return $scope.form.validateDemoForm.$valid;
    };

    $scope.submit = function() {

    };
  }]);
angular
  .module('theme.demos.forms')
  .controller('DatepickerDemoController', ['$scope', function($scope) {
    'use strict';
    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function() {
      $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
    };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.initDate = new Date('2016-15-20');
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
  }]);
angular
  .module('theme.demos.forms')
  .controller('DateRangePickerDemo', ['$scope', '$window', function($scope, $window) {
    'use strict';
    var moment = $window.moment;
    $scope.drp_start = moment().subtract(1, 'days').format('MMMM D, YYYY');
    $scope.drp_end = moment().add(31, 'days').format('MMMM D, YYYY');
    $scope.drp_options = {
      ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      },
      opens: 'left',
      startDate: moment().subtract(29, 'days'),
      endDate: moment()
    };
  }]);
angular
  .module('theme.demos.forms')
  .controller('FormComponentsController', ['$scope', '$http', '$theme', function($scope, $http, $theme) {
    'use strict';
    $scope.getBrandColor = function(color) {
      return $theme.getBrandColor(color);
    };
    $scope.switchStatus = 1;
    $scope.switchStatus2 = 1;
    $scope.switchStatus3 = 1;
    $scope.switchStatus4 = 1;
    $scope.switchStatus5 = 1;
    $scope.switchStatus6 = 1;

    $scope.getLocation = function(val) {
      return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: val,
          sensor: false
        }
      }).then(function(res) {
        var addresses = [];
        angular.forEach(res.data.results, function(item) {
          addresses.push(item.formatted_address);
        });
        return addresses;
      });
    };

    $scope.colorPicked = '#fa4d4d';

    $scope.tagList = ['tag1', 'tag2'];
    $scope.select2TaggingOptions = {
      'multiple': true,
      'simple_tags': true,
      'tags': ['tag1', 'tag2', 'tag3', 'tag4'] // Can be empty list.
    };

    $scope.clear = function() {
      $scope.person.selected = undefined;
      $scope.address.selected = undefined;
      $scope.country.selected = undefined;
    };

    $scope.someGroupFn = function(item) {

      if (item.name[0] >= 'A' && item.name[0] <= 'M') {
        return 'From A - M';
      }

      if (item.name[0] >= 'N' && item.name[0] <= 'Z') {
        return 'From N - Z';
      }
    };

    // ui-select stuff
    $scope.availableColors = ['Red', 'Green', 'Blue', 'Yellow', 'Magenta', 'Maroon', 'Umbra', 'Turquoise'];

    $scope.multipleDemo = {};
    $scope.multipleDemo.colors = ['Blue', 'Red'];
    $scope.multipleDemo.colors2 = ['Blue', 'Red'];

    $scope.address = {};
    $scope.refreshAddresses = function(address) {
      var params = {
        address: address,
        sensor: false
      };
      return $http.get(
        'http://maps.googleapis.com/maps/api/geocode/json', {
          params: params
        }
      ).then(function(response) {
        $scope.addresses = response.data.results;
      });
    };

    $scope.selectedCountry = {};
    $scope.selectedCountries = {};
    $scope.countries = [];
    $http.get('assets/demo/countries.json').success(function(response) {
      $scope.countries = response;
    });
  }]);
angular
  .module('theme.demos.forms')
  .controller('ImageCropController', ['$scope', function($scope) {
    'use strict';
    $scope.cropped = false;
    var imgBounds;
    $scope.setBounds = function(bounds) {
      imgBounds = bounds;
    };
    $scope.selected = function(coords) {
      $scope.imageWidth = imgBounds[0];
      $scope.containerWidth = coords.w;
      $scope.containerHeight = coords.h;
      $scope.imageTop = -coords.y;
      $scope.imageLeft = -coords.x;
      $scope.cropped = true;
    };
  }]);
angular
  .module('theme.demos.forms')
  .controller('InlineEditableController', ['$scope', '$filter', function($scope, $filter) {
    'use strict';
    $scope.user = {
      name: 'awesome user',
      status: 2,
      group: 4,
      groupName: 'admin',
      email: 'email@example.com',
      tel: '123-45-67',
      number: 29,
      range: 10,
      url: 'http://example.com',
      search: 'blabla',
      color: '#6a4415',
      date: null,
      time: '12:30',
      datetime: null,
      month: null,
      week: null,
      desc: 'Awesome user \ndescription!',
      remember: true,
      dob: new Date(1984, 4, 15),
      timebs: new Date(1984, 4, 15, 19, 20),
    };
    $scope.statuses = [{
      value: 1,
      text: 'status1'
    }, {
      value: 2,
      text: 'status2'
    }, {
      value: 3,
      text: 'status3'
    }, {
      value: 4,
      text: 'status4'
    }];

    $scope.showStatus = function() {
      var selected = $filter('filter')($scope.statuses, {
        value: $scope.user.status
      });
      return ($scope.user.status && selected.length) ? selected[0].text : 'Not set';
    };

    $scope.groups = [{
      id: 1,
      text: 'MVP'
    }, {
      id: 2,
      text: 'VIP'
    }, {
      id: 3,
      text: 'ADMIN'
    }, {
      id: 4,
      text: 'USER'
    }];

    $scope.$watch('user.group', function(newVal, oldVal) {
      if (newVal !== oldVal) {
        var selected = $filter('filter')($scope.groups, {
          id: $scope.user.group
        });
        $scope.user.groupName = selected.length ? selected[0].text : null;
      }
    });
  }]);
angular
  .module('theme.demos.forms')
  .controller('TimepickerDemoCtrl', ['$scope', function($scope) {
    'use strict';
    $scope.mytime = new Date();

    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.options = {
      hstep: [1, 2, 3],
      mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;
    $scope.toggleMode = function() {
      $scope.ismeridian = !$scope.ismeridian;
    };

    $scope.update = function() {
      var d = new Date();
      d.setHours(14);
      d.setMinutes(0);
      $scope.mytime = d;
    };

    $scope.changed = function() {
      console.log('Time changed to: ' + $scope.mytime);
    };

    $scope.clear = function() {
      $scope.mytime = null;
    };
  }]);
angular
  .module('theme.demos.gallery', [
    'ui.bootstrap',
    'theme.gallery',
  ])
  .controller('GalleryController', ['$scope', '$modal', '$timeout', function($scope, $modal) {
    'use strict';
    $scope.galleryFilter = 'all';

    $scope.openImageModal = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $modal.open({
        templateUrl: 'imageModalContent.html',
        controller: ['$scope', '$modalInstance', 'src', function($scope, $modalInstance, src) {
          $scope.src = src;
          $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
          };
        }],
        size: 'lg',
        resolve: {
          src: function() {
            console.log($event.target.src.replace('thumb_', ''));
            return $event.target.src.replace('thmb_', '');
          }
        }
      });
    };
  }]);
angular.module('theme.demos.google_maps', [
    'theme.google_maps'
  ])
  .controller('GMapsController', ['$scope', '$window', function($scope, $window) {
    'use strict';
    $scope.basicMapOptions = {
      lat: -12.043333,
      lng: -77.028333
    };

    $scope.routeMapInstance = {};
    $scope.routeMapOptions = {
      lat: -12.043333,
      lng: -77.028333
    };
    $scope.startRoute = function($event) {
      $event.preventDefault();
      $scope.routeMapInstance.travelRoute({
        origin: [-12.044012922866312, -77.02470665341184],
        destination: [-12.090814532191756, -77.02271108990476],
        travelMode: 'driving',
        step: function(e) {
          angular.element('#instructions').append('<li>' + e.instructions + '</li>');
          angular.element('#instructions li:eq(' + e.step_number + ')').delay(450 * e.step_number).fadeIn(200, function() {
            $scope.routeMapInstance.setCenter(e.end_location.lat(), e.end_location.lng());
            $scope.routeMapInstance.drawPolyline({
              path: e.path,
              strokeColor: '#131540',
              strokeOpacity: 0.6,
              strokeWeight: 6
            });
          });
        }
      });
    };

    $scope.panoramicMapOptions = {
      lat: -12.043333,
      lng: -77.028333
    };

    var infoWindow = new $window.google.maps.InfoWindow({});

    $scope.fusionMapInstance = {};
    $scope.fusionMapOptions = {
      zoom: 11,
      lat: 41.850033,
      lng: -87.6500523
    };

    var path = [
      [-12.044012922866312, -77.02470665341184],
      [-12.05449279282314, -77.03024273281858],
      [-12.055122327623378, -77.03039293652341],
      [-12.075917129727586, -77.02764635449216],
      [-12.07635776902266, -77.02792530422971],
      [-12.076819390363665, -77.02893381481931],
      [-12.088527520066453, -77.0241058385925],
      [-12.090814532191756, -77.02271108990476]
    ];

    $scope.polylinesMapInstance = {};
    $scope.polylinesMapOptions = {
      lat: -12.043333,
      lng: -77.028333,
      click: function(e) {
        console.log(e);
      }
    };

    $scope.geoCodingMapInstance = {};
    $scope.geocodeAddress = 'Rio';

    $scope.submitGeocoding = function(address) {
      $window.GMaps.geocode({
        address: address,
        callback: function(results, status) {
          if (status === 'OK') {
            var latlng = results[0].geometry.location;
            $scope.geoCodingMapInstance.setCenter(latlng.lat(), latlng.lng());
            $scope.geoCodingMapInstance.addMarker({
              lat: latlng.lat(),
              lng: latlng.lng()
            });
          }
        }
      });
    };

    $scope.$on('GMaps:created', function(event, mapInstance) {
      if (mapInstance.key) {
        $scope[mapInstance.key] = mapInstance.map;
      }

      if (mapInstance.key === 'fusionMapInstance') {
        $scope.fusionMapInstance.loadFromFusionTables({
          query: {
            select: '\'Geocodable address\'',
            from: '1mZ53Z70NsChnBMm-qEYmSDOvLXgrreLTkQUvvg'
          },
          suppressInfoWindows: true,
          events: {
            click: function(point) {
              infoWindow.setContent('You clicked here!');
              infoWindow.setPosition(point.latLng);
              infoWindow.open($window.fusion.map);
            }
          }
        });
      } else if (mapInstance.key === 'polylinesMapInstance') {
        $scope.polylinesMapInstance.drawPolyline({
          path: path,
          strokeColor: '#131540',
          strokeOpacity: 0.6,
          strokeWeight: 6
        });
      } else if (mapInstance.key === 'geoCodingMapInstance') {}
    });
  }]);
angular
  .module('theme.demos.horizontal_layout', [
    'theme.core.services'
  ])
  .controller('HorizontalPageController', ['$scope', '$theme', function($scope, $theme) {
    'use strict';
    var isHorizontal = $theme.get('layoutHorizontal');
    $theme.set('layoutHorizontal', true);

    $scope.$on('$destroy', function() {
      if (!isHorizontal) {
        $theme.set('layoutHorizontal', false);
      }
    });
  }])
  .controller('HorizontalPage2Controller', ['$scope', '$theme', function($scope, $theme) {
    'use strict';
    var isHorizontal = $theme.get('layoutHorizontal');
    var isLargeIcons = $theme.get('layoutHorizontalLargeIcons');
    $theme.set('layoutHorizontal', true);
    $theme.set('layoutHorizontalLargeIcons', true);

    $scope.$on('$destroy', function() {
      if (!isHorizontal) {
        $theme.set('layoutHorizontal', false);
      }
      if (!isLargeIcons) {
        $theme.set('layoutHorizontalLargeIcons', false);
      }
    });
  }]);
angular.module('theme.mail.compose_controller', ['textAngular'])
  .controller('ComposeController', ['$scope', '$theme', function($scope, $theme) {
    'use strict';
    $scope.mailBody = null;

    if ($theme.get('leftbarCollapsed') == false) {
        $theme.set('leftbarCollapsed', true);

        $scope.$on('$destroy', function() {
            $theme.set('leftbarCollapsed', false);
        });
    }
  }]);
angular.module('theme.mail.inbox_controller', [])
  .controller('InboxController', ['$scope', '$location', '$theme', function($scope, $location, $theme) {
    'use strict';
    $scope.openMail = function() {
      $location.path('/read-mail');
    };

    if ($theme.get('leftbarCollapsed') == false) {
        $theme.set('leftbarCollapsed', true);

        $scope.$on('$destroy', function() {
            $theme.set('leftbarCollapsed', false);
        });
    }
  }]);
angular.module('theme.demos.mail', [
    'theme.mail.inbox_controller',
    'theme.mail.compose_controller'
  ])
  .config(['$routeProvider', function($routeProvider) {
    'use strict';
    $routeProvider
      .when('/inbox', {
        templateUrl: 'views/extras-inbox.html'
      })
      .when('/compose-mail', {
        templateUrl: 'views/extras-inbox-compose.html'
      })
      .when('/read-mail', {
        templateUrl: 'views/extras-inbox-read.html'
      });
  }]);
angular
  .module('theme.demos.morris_charts', [
    'theme.core.services',
    'theme.chart.morris'
  ])
  .config(['$routeProvider', function($routeProvider) {
    'use strict';
    $routeProvider
      .when('/charts-morrisjs', {
        templateUrl: 'views/charts-morrisjs.html',
        resolve: {
          loadMorris: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([
              'bower_components/raphael/raphael.js',
              'bower_components/morris.js/morris.js'
            ]);
          }]
        }
      });
  }])
  .controller('SvgChartsController', ['$scope', '$theme', function($scope, $theme) {
    'use strict';
    $scope.lineChart = {
      data: [{
        y: '2006',
        a: 100,
        b: 90
      }, {
        y: '2007',
        a: 75,
        b: 65
      }, {
        y: '2008',
        a: 50,
        b: 40
      }, {
        y: '2009',
        a: 75,
        b: 65
      }, {
        y: '2010',
        a: 50,
        b: 40
      }, {
        y: '2011',
        a: 75,
        b: 65
      }, {
        y: '2012',
        a: 100,
        b: 90
      }],
      xkey: 'y',
      ykeys: ['a', 'b'],
      labels: ['Series A', 'Series B'],
      lineColors: [$theme.getBrandColor('inverse'), $theme.getBrandColor('midnightblue')]
    };
    $scope.barChart = {
      data: [{
        y: '2006',
        a: 100,
        b: 90
      }, {
        y: '2007',
        a: 75,
        b: 65
      }, {
        y: '2008',
        a: 50,
        b: 40
      }, {
        y: '2009',
        a: 75,
        b: 65
      }, {
        y: '2010',
        a: 50,
        b: 40
      }, {
        y: '2011',
        a: 75,
        b: 65
      }, {
        y: '2012',
        a: 100,
        b: 90
      }],
      xkey: 'y',
      ykeys: ['a', 'b'],
      labels: ['Series A', 'Series B'],
      barColors: [$theme.getBrandColor('inverse'), $theme.getBrandColor('midnightblue')]
    };
    $scope.donutChart = {
      data: [{
        label: 'Download Sales',
        value: 12
      }, {
        label: 'In-Store Sales',
        value: 30
      }, {
        label: 'Mail-Order Sales',
        value: 20
      }],
      colors: [$theme.getBrandColor('grape'), $theme.getBrandColor('inverse'), $theme.getBrandColor('green')]
    };
    $scope.areaChart = {
      data: [{
        y: '2006',
        a: 100,
        b: 90
      }, {
        y: '2007',
        a: 75,
        b: 65
      }, {
        y: '2008',
        a: 50,
        b: 40
      }, {
        y: '2009',
        a: 75,
        b: 65
      }, {
        y: '2010',
        a: 50,
        b: 40
      }, {
        y: '2011',
        a: 75,
        b: 65
      }, {
        y: '2012',
        a: 100,
        b: 90
      }],
      xkey: 'y',
      ykeys: ['a', 'b'],
      labels: ['Series A', 'Series B'],
      lineColors: [$theme.getBrandColor('midnightblue'), $theme.getBrandColor('inverse')]
    };
  }]);
angular
  .module('theme.demos.sparkline_charts', [
    'theme.chart.sparklines'
  ]);
angular
  .module('theme.demos.ng_grid', [
    'ngGrid'
  ])
  .controller('TablesAdvancedController', ['$scope', '$filter', '$http', function($scope, $filter, $http) {
    'use strict';
    $scope.filterOptions = {
      filterText: '',
      useExternalFilter: true
    };
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
      pageSizes: [25, 50, 100],
      pageSize: 25,
      currentPage: 1
    };
    $scope.setPagingData = function(data, page, pageSize) {
      var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
      $scope.myData = pagedData;
      $scope.totalServerItems = data.length;
      if (!$scope.$$phase) {
        $scope.$apply();
      }
    };
    $scope.getPagedDataAsync = function(pageSize, page, searchText) {
      setTimeout(function() {
        var data;
        if (searchText) {
          var ft = searchText.toLowerCase();
          $http.get('assets/demo/ng-data.json').success(function(largeLoad) {
            data = largeLoad.filter(function(item) {
              return JSON.stringify(item).toLowerCase().indexOf(ft) !== -1;
            });
            $scope.setPagingData(data, page, pageSize);
          });
        } else {
          $http.get('assets/demo/ng-data.json').success(function(largeLoad) {
            $scope.setPagingData(largeLoad, page, pageSize);
          });
        }
      }, 100);
    };

    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    $scope.$watch('pagingOptions', function(newVal, oldVal) {
      if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
      }
    }, true);
    $scope.$watch('filterOptions', function(newVal, oldVal) {
      if (newVal !== oldVal) {
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
      }
    }, true);

    $scope.gridOptions = {
      data: 'myData',
      enablePaging: true,
      showFooter: true,
      totalServerItems: 'totalServerItems',
      pagingOptions: $scope.pagingOptions,
      filterOptions: $scope.filterOptions
    };
  }]);
angular
  .module('theme.demos.signup_page', [
    'theme.core.services'
  ])
  .controller('SignupPageController', ['$scope', '$theme', function($scope, $theme) {
    'use strict';
    $theme.set('fullscreen', true);

    $scope.$on('$destroy', function() {
      $theme.set('fullscreen', false);
    });
  }]);
angular
  .module('theme.demos.not_found', [
    'theme.core.services'
  ])
  .controller('NotFoundController', ['$scope', '$theme', function($scope, $theme) {
    'use strict';
    $theme.set('fullscreen', true);

    $scope.$on('$destroy', function() {
      $theme.set('fullscreen', false);
    });
  }]);
angular
	.module('theme.demos.error_page', [
		'theme.core.services'
	])
	.controller('ErrorPageController', ['$scope', '$theme', function($scope, $theme) {
		'use strict';
		$theme.set('fullscreen', true);

		$scope.$on('$destroy', function() {
			$theme.set('fullscreen', false);
		});
	}]);
angular.module('theme.demos.tasks', [])
  .controller('TasksController', ['$scope', function($scope) {
    'use strict';
    $scope.newTaskTitle = '';
    $scope.newTaskLabelText = '';
    $scope.showTasksTab = true;
    $scope.showCompletedTab = false;

    $scope.tasks = [{
      title: 'Write documentation',
      label: 'Due tomorrow',
      color: 'success'
    }, {
      title: 'Compile Code',
      label: 'Today',
      color: 'danger'
    }, {
      title: 'Upload Files to Server',
      label: '6 days',
      color: 'primary'
    }, {
      title: 'Call client',
      label: 'Tomorrow',
      color: 'warning'
    }, {
      title: 'Buy Milk',
      label: 'Today',
      color: 'danger'
    }, {
      title: 'Set up meeting with client',
      label: 'Any day',
      color: 'inverse'
    }, {
      title: 'Pay office rent and bills',
      label: '5 days from now',
      color: 'success'
    }];

    $scope.tasksComplete = [{
      title: 'Write documentation',
      label: 'Due tomorrow',
      color: 'success'
    }, {
      title: 'Set up meeting with client',
      label: 'Any day',
      color: 'inverse'
    }, {
      title: 'Pay office rent and bills',
      label: '5 days from now',
      color: 'success'
    }];

    $scope.selectedItem = {};

    $scope.options = {};

    $scope.remove = function(scope) {
      $scope.tasks.splice(scope.index(), 1);
    };

    $scope.complete = function(scope, item) {
      $scope.tasksComplete.push(item);
      $scope.tasks.splice(scope.index(), 1);
    };

    $scope.incomplete = function(item, index) {
      $scope.tasks.push(item);
      $scope.tasksComplete.splice(index, 1);
    };

    $scope.newItem = function(title, label, color) {
      if (this.newTaskTitle === '') {
        return;
      }
      $scope.tasks.push({
        title: title,
        label: label,
        color: color
      });
      this.newTaskTitle = '';
      this.newTaskLabelText = '';
      this.showForm = false;
    };

    $scope.edit = function(item) {
      item.editing = true;
      item.titlePrev = item.title;
      item.labelPrev = item.label;
      item.colorPrev = item.color;
    };

    $scope.cancelEdit = function($event, item) {
      if ($event.keyCode !== 27) {
        return;
      }
      item.title = item.titlePrev;
      item.label = item.labelPrev;
      item.color = item.colorPrev;
      item.editing = false;
    };

    $scope.cancelAdd = function($event) {
      if ($event.keyCode !== 27) {
        return;
      }
      this.newTaskTitle = '';
      this.newTaskLabelText = '';
      this.showForm = false;
    };

    $scope.doneEditing = function(item) {
      item.editing = false;
    };
  }]);
angular
  .module('theme.demos.ui_components', [
    'ui.tree'
  ]);
angular
  .module('theme.demos.ui_components', ['theme.core.services'])
  .controller('AlertsController', ['$scope', 'pinesNotifications', '$window', function($scope, pinesNotifications, $window) {
    'use strict';
    var _ = $window._;
    $scope.alerts = [{
      type: 'success',
      msg: '<strong>Well done!</strong> You successfully read this important alert message.'
    }, {
      type: 'warning',
      msg: '<strong>Warning!</strong> Best check yo self, you\'re not looking too good.'
    }, {
      type: 'info',
      msg: '<strong>Heads up!</strong> This alert needs your attention, but it\'s not super important.'
    }, {
      type: 'danger',
      msg: '<strong>Oh snap!</strong> Change a few things up and try submitting again.'
    }];

    $scope.addAlert = function() {
      var types = ['info', 'warning', 'danger', 'success'];
      $scope.alerts.push({
        msg: 'Alerts can be added dynamically!',
        type: _.shuffle(types).shift()
      });
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

    $scope.simpleInfo = function() {
      pinesNotifications.notify({
        title: 'New Thing',
        text: 'Just to let you know, something happened.',
        type: 'info'
      });
    };

    $scope.simpleSuccess = function() {
      pinesNotifications.notify({
        title: 'New Thing',
        text: 'Just to let you know, something happened.',
        type: 'success'
      });
    };

    $scope.simpleError = function() {
      pinesNotifications.notify({
        title: 'New Thing',
        text: 'Just to let you know, something happened.',
        type: 'error'
      });
    };

    $scope.stickyInfo = function() {
      pinesNotifications.notify({
        title: 'Sticky Info',
        text: 'Sticky info, you know, like a newspaper covered in honey.',
        type: 'info',
        hide: false
      });
    };

    $scope.stickySuccess = function() {
      pinesNotifications.notify({
        title: 'Sticky Success',
        text: 'Sticky success... I\'m not even gonna make a joke.',
        type: 'success',
        hide: false
      });
    };

    $scope.stickyError = function() {
      pinesNotifications.notify({
        title: 'Uh Oh!',
        text: 'Something really terrible happened. You really need to read this, so I won\'t close automatically.',
        type: 'error',
        hide: false
      });
    };

    $scope.bigNotice = function() {
      pinesNotifications.notify({
        title: 'Big Notice',
        text: 'Check me out! I\'m tall and wide, even though my text isn\'t.',
        width: '500px',
        type: 'error',
        min_height: '400px'
      });
    };

    $scope.showRich = function() {
      pinesNotifications.notify({
        title: '<span style="color: red;">Rich Content Notice</span>',
        type: 'success',
        text: '<span style="color: blue;">Look at my beautiful <strong>strong</strong>, <em>emphasized</em>, and <span style="font-size: 1.5em;">large</span> text.</span>'
      });
    };

    $scope.showDynamic = function() {
      var percent = 0;
      var notice = pinesNotifications.notify({
        title: 'Please Wait',
        type: 'info',
        icon: 'fa fa-spin fa-refresh',
        hide: false,
        closer: false,
        sticker: false,
        opacity: 0.75,
        shadow: false,
        width: '200px'
      });

      setTimeout(function() {
        notice.notify({
          title: false
        });
        var interval = setInterval(function() {
          percent += 2;
          var options = {
            text: percent + '% complete.'
          };
          if (percent === 80) {
            options.title = 'Almost There';
          }
          if (percent >= 100) {
            window.clearInterval(interval);
            options.title = 'Done!';
            options.type = 'success';
            options.hide = true;
            options.closer = true;
            options.sticker = true;
            options.icon = 'fa fa-check';
            options.opacity = 1;
            options.shadow = true;
          }
          notice.notify(options);
        }, 120);
      }, 2000);
    };

    $scope.showNoHistory = function() {
      pinesNotifications.notify({
        title: 'No History Notice',
        text: 'I\'m not part of the notice history, so if you redisplay the last message, it won\'t be me.',
        history: false,
        type: 'error'
      });
    };

    $scope.showNoSticky = function() {
      pinesNotifications.notify({
        title: 'No Sticky Button Notice',
        text: 'Check me out! I\'m a sticky notice with no unsticky button. You\'ll have to close me yourself.',
        hide: false,
        sticker: false,
        type: 'error'
      });
    };

    $scope.showPermanent = function() {
      pinesNotifications.notify({
        title: 'Permanent Buttons Notice',
        text: 'My buttons are really lonely, so they\'re gonna hang out with us.',
        closer_hover: false,
        sticker_hover: false,
        type: 'error'
      });
    };

    $scope.showNoMouseReset = function() {
      pinesNotifications.notify({
        title: 'No Mouse Reset Notice',
        text: 'I don\'t care if you move your mouse over me, I\'ll disappear when I want.',
        mouse_reset: false,
        type: 'error'
      });
    };

    $scope.showChanging = function() {
      pinesNotifications.notify({
        title: 'Notice',
        type: 'error',
        text: 'Right now I\'m a notice.',
        before_close: function(notification) {
          notification.notify({
            title: 'Error',
            text: 'Uh oh. Now I\'ve become an error.',
            type: 'error',
            before_close: function(notification) {
              notification.notify({
                title: 'Success',
                text: 'I fixed the error!',
                type: 'success',
                before_close: function(notification) {
                  notification.notify({
                    title: 'Info',
                    text: 'Everything\'s cool now.',
                    type: 'info',
                    before_close: null
                  });
                  notification.queueRemove();
                  return false;
                }
              });
              notification.queueRemove();
              return false;
            }
          });
          notification.queueRemove();
          return false;
        }
      });
    };
  }]);
angular
  .module('theme.demos.ui_components')
  .controller('CarouselDemoController', ['$scope', function($scope) {
    'use strict';
    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    var images = ['carousel_01.jpg', 'carousel_02.jpg', 'carousel_03.jpg'];
    $scope.addSlide = function() {
      slides.push({
        image: 'assets/demo/stockphoto/' + images[slides.length],
        text: images[slides.length]
      });
    };
    for (var i = 0; i < 3; i++) {
      $scope.addSlide();
    }
  }]);
angular
  .module('theme.demos.ui_components')
  .controller('ModalsDemoController', ['$scope', '$modal', '$bootbox', '$log', '$window', function($scope, $modal, $bootbox, $log, $window) {
    'use strict';
    var alert = $window.alert;
    $scope.items = ['item1', 'item2', 'item3'];

    $scope.open = function(size) {
      var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
        controller: function($scope, $modalInstance, items) {
          $scope.items = items;
          $scope.selected = {
            item: $scope.items[0]
          };

          $scope.ok = function() {
            $modalInstance.close($scope.selected.item);
          };

          $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
          };
        },
        size: size,
        resolve: {
          items: function() {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function(selectedItem) {
        $scope.selected = selectedItem;
      }, function() {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.openDemoModal = function(size) {
      $modal.open({
        templateUrl: 'demoModalContent.html',
        controller: function($scope, $modalInstance) {
          $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
          };
        },
        size: size,
      });
    };

    $scope.openAlert = function() {
      $bootbox.alert('Hello world!');
    };
    $scope.openAlertWithCallback = function() {
      $bootbox.alert('Hello world!', function() {
        alert('You clicked OK!');
      });
    };
    $scope.openConfirm = function() {
      $bootbox.confirm('Are you sure?', function(result) {
        alert('Confirm result: ' + result);
      });
    };
    $scope.openPrompt = function() {
      $bootbox.prompt('What is your name?', function(result) {
        if (result === null) {
          alert('Prompt dismissed');
        } else {
          alert('Hi ' + result + '!');
        }
      });
    };
    $scope.openDialog = function() {
      $bootbox.dialog({
        message: 'I am a custom dialog',
        title: 'Custom title',
        buttons: {
          success: {
            label: 'Success!',
            className: 'btn-success',
            callback: function() {
              alert('great success');
            }
          },
          danger: {
            label: 'Danger!',
            className: 'btn-danger',
            callback: function() {
              alert('uh oh, look out!');
            }
          },
          main: {
            label: 'Click ME!',
            className: 'btn-primary',
            callback: function() {
              alert('Primary button');
            }
          }
        }
      });
    };
  }]);
angular
  .module('theme.demos.ui_components')
  .controller('PaginationAndPagingController', ['$scope', '$window', function($scope, $window) {
    'use strict';
    $scope.totalItems = 64;
    $scope.currentPage = 4;

    $scope.pageChanged = function() {
      console.log('Page changed to: ' + $scope.currentPage);
    };

    $scope.maxSize = 5;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;

    $scope.dpWithCallback = {
      onSelectedDateChanged: function(event, date) {
        $window.alert('Selected date: ' + $window.moment(date).format('Do, MMM YYYY'));
      }
    };
  }]);
angular
  .module('theme.demos.ui_components')
  .controller('ProgressbarController', ['$scope', function($scope) {
    'use strict';
    $scope.rootPanels = [{
      active: false
    }, {
      active: true
    }];

    $scope.max = 200;

    $scope.random = function() {
      var value = Math.floor((Math.random() * 100) + 1);
      var type;

      if (value < 25) {
        type = 'success';
      } else if (value < 50) {
        type = 'info';
      } else if (value < 75) {
        type = 'warning';
      } else {
        type = 'danger';
      }

      $scope.showWarning = (type === 'danger' || type === 'warning');

      $scope.dynamic = value;
      $scope.type = type;
    };
    $scope.random();

    $scope.randomStacked = function() {
      $scope.stacked = [];
      var types = ['success', 'info', 'warning', 'danger'];

      for (var i = 0, n = Math.floor((Math.random() * 4) + 1); i < n; i++) {
        var index = Math.floor((Math.random() * 4));
        $scope.stacked.push({
          value: Math.floor((Math.random() * 30) + 1),
          type: types[index]
        });
      }
    };
    $scope.randomStacked();
  }]);
angular
  .module('theme.demos.ui_components')
  .controller('RatingsDemoController', ['$scope', function($scope) {
    'use strict';
    $scope.rate = 7;
    $scope.max = 10;
    $scope.isReadonly = false;

    $scope.hoveringOver = function(value) {
      this.overStar = value;
      this.percent = 100 * (value / $scope.max);
    };

    $scope.ratingStates = [{
      stateOn: 'fa-check-circle',
      stateOff: 'fa-check-circle-o'
    }, {
      stateOn: 'fa-star',
      stateOff: 'fa-star-o'
    }, {
      stateOn: 'fa-heart',
      stateOff: 'fa-heart-o'
    }, {
      stateOn: 'fa-heart'
    }, {
      stateOff: 'fa-heart-o'
    }];
  }]);
angular
  .module('theme.demos.ui_components')
  .controller('RangeAndSliderController', ['$scope', 'progressLoader', '$window', function($scope, progressLoader, $window) {
    'use strict';
    var _ = $window._;
    var alert = $window.alert;
    $scope.percent = 43;
    $scope.percentages = [53, 65, 23, 99];
    $scope.epOpts = [{
      animate: {
        duration: 1000,
        enabled: true
      },
      barColor: "#16a085",
      trackColor: 'transparent',
      scaleColor: '#eee',
      scaleLength: 8,
      lineCap: 'square',
      lineWidth: 2,
      size: 96
    }, {
      barColor: "#7ccc2e",
      trackColor: 'transparent',
      scaleColor: '#eee',
      scaleLength: 8,
      lineCap: 'square',
      lineWidth: 2,
      size: 96,
      animate: {
        duration: 1000,
        enabled: true
      },
    }, {
      animate: {
        duration: 1000,
        enabled: true
      },
      barColor: "#e84747",
      trackColor: 'transparent',
      scaleColor: '#eee',
      scaleLength: 8,
      lineCap: 'square',
      lineWidth: 2,
      size: 96
    }, {
      barColor: "#8e44ad",
      trackColor: 'transparent',
      scaleColor: '#eee',
      scaleLength: 8,
      lineCap: 'square',
      lineWidth: 2,
      size: 96,
      animate: {
        duration: 1000,
        enabled: true
      },
    }];

    $scope.randomizePie = function() {
      $scope.percentages = _.shuffle($scope.percentages);
    };

    $scope.loaderStart = function() {
      progressLoader.start();
      setTimeout(function() {
        progressLoader.set(50);
      }, 1000);

      setTimeout(function() {
        progressLoader.end();
      }, 1500);
    };
    $scope.loaderEnd = function() {
      progressLoader.end();
    };
    $scope.loaderSet = function(position) {
      progressLoader.set(position);
    };
    $scope.loaderGet = function() {
      alert(progressLoader.get() + '%');
    };
    $scope.loaderInch = function() {
      progressLoader.inch(10);
    };
  }]);
angular
  .module('theme.demos.ui_components')
  .controller('TabsAndAccordionsDemoController', ['$scope', function($scope) {
    'use strict';
    $scope.oneAtATime = true;

    $scope.groups = [{
      title: 'Dynamic Group Header - 1',
      content: 'Dynamic Group Body - 1'
    }, {
      title: 'Dynamic Group Header - 2',
      content: 'Dynamic Group Body - 2'
    }];

    $scope.items = ['Item 1', 'Item 2', 'Item 3'];

    $scope.addItem = function() {
      var newItemNo = $scope.items.length + 1;
      $scope.items.push('Item ' + newItemNo);
    };

    $scope.status = {
      isFirstOpen: true,
      isFirstDisabled: false
    };
  }]);
angular.module('theme.demos.vector_maps', [
    'theme.vector_maps'
  ])
  .config(['$routeProvider', function($routeProvider) {
    'use strict';
    $routeProvider
      .when('/maps-vector', {
        templateUrl: 'views/maps-vector.html',
        resolve: {
          loadJqvmap: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([
              'assets/plugins/jvectormap/jquery-jvectormap-world-mill-en.js',
              'assets/plugins/jvectormap/jquery-jvectormap-cn-mill-en.js',
              'assets/plugins/jvectormap/jquery-jvectormap-dk-mill-en.js',
              'assets/plugins/jvectormap/jquery-jvectormap-europe-mill-en.js',
              'assets/plugins/jvectormap/jquery-jvectormap-in-mill-en.js',
              'assets/plugins/jvectormap/jquery-jvectormap-nl-mill-en.js',
              'assets/plugins/jvectormap/jquery-jvectormap-se-mill-en.js',
              'assets/plugins/jvectormap/jquery-jvectormap-us-aea-en.js',
              'assets/plugins/jvectormap/jquery-jvectormap-us-ny-newyork-mill-en.js',
            ]);
          }]
        }
      });
  }])
  .controller('VectorMapsController', ['$scope', '$window', function($scope, $window) {
    'use strict;'
    $scope.worldmap = {
      map: 'world_mill_en',
      backgroundColor: 'transparent',
        regionStyle: {
          initial: {
            fill: '#8d8d8d'
        }
      }
    };
    $scope.china = {
      map: 'cn_mill_en',
      backgroundColor: 'transparent',
        regionStyle: {
          initial: {
            fill: '#8d8d8d'
        }
      }
    };
    $scope.denmark = {
      map: 'dk_mill_en',
      backgroundColor: 'transparent',
        regionStyle: {
          initial: {
            fill: '#8d8d8d'
        }
      }
    };
    $scope.europe = {
      map: 'europe_mill_en'   ,
      backgroundColor: 'transparent',
        regionStyle: {
          initial: {
            fill: '#8d8d8d'
        }
      }
    };
    $scope.india = {
      map: 'in_mill_en',
      backgroundColor: 'transparent',
        regionStyle: {
          initial: {
            fill: '#8d8d8d'
        }
      }
    };
    $scope.netherlands = {
      map: 'nl_mill_en',
      backgroundColor: 'transparent',
        regionStyle: {
          initial: {
            fill: '#8d8d8d'
        }
      }
    };
    $scope.sweden = {
      map: 'se_mill_en',
      backgroundColor: 'transparent',
        regionStyle: {
          initial: {
            fill: '#8d8d8d'
        }
      }
    };
    $scope.usa = {
      map: 'us_aea_en',
      backgroundColor: 'transparent',
        regionStyle: {
          initial: {
            fill: '#8d8d8d'
        }
      }
    };
    $scope.usaNy = {
      map: 'us-ny-newyork_mill_en',
      backgroundColor: 'transparent',
        regionStyle: {
          initial: {
            fill: '#8d8d8d'
        }
      }
    };
  }]);
angular.module('theme.demos.dashboard', [
    'angular-skycons',
    'angular-chartist',
    'theme.chart.canvas',
    'theme.demos.forms',
    'theme.demos.tasks'
  ])
  .controller('DashboardController', ['$scope', '$theme', '$timeout', '$window', function($scope, $theme, $timeout, $window) {
    'use strict';

    // EasyPieChart

        try {
            $scope.designprogress = {
                barColor: "#ef9a9a",
                trackColor: 'rgba(255, 255, 255, 0.32)',
                scaleColor: false,
                scaleLength: 8,
                lineCap: 'square',
                lineWidth: 2,
                size: 128,
                onStep: function(from, to, percent) {
                    $(this.el).find('.percent-non').text(Math.round(percent));
                }
            };

            $scope.codingprogress = {
                barColor: "#80deea",
                trackColor: 'rgba(255, 255, 255, 0.32)',
                scaleColor: false,
                scaleLength: 8,
                lineCap: 'square',
                lineWidth: 2,
                size: 128,
                onStep: function(from, to, percent) {
                    $(this.el).find('.percent-non').text(Math.round(percent));
                }
            };

            $scope.docsprogress = {
                barColor: "#c5e1a5",
                trackColor: 'rgba(255, 255, 255, 0.32)',
                scaleColor: false,
                scaleLength: 8,
                lineCap: 'square',
                lineWidth: 2,
                size: 128,
                onStep: function(from, to, percent) {
                    $(this.el).find('.percent-non').text(Math.round(percent));
                }
            };

            $scope.sales = {
                barColor: "#cddc39",
                trackColor: 'rgba(255, 255, 255, 0.32)',
                scaleColor: false,
                scaleLength: 8,
                lineCap: 'square',
                lineWidth: 2,
                size: 96,
                onStep: function(from, to, percent) {
                    $(this.el).find('.percent-non').text(Math.round(percent));
                }
            };


            $scope.dashboardVisitor = {
                barColor: "#4dd0e1",
                trackColor: 'rgba(0, 0, 0, 0.05)',
                scaleColor: false,
                scaleLength: 8,
                lineCap: 'square',
                lineWidth: 2,
                size: 64,
                onStep: function(from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                }
            };
            $scope.dashboardPageview = {
                barColor: "#ff8a65",
                trackColor: 'rgba(0, 0, 0, 0.05)',
                scaleColor: false,
                scaleLength: 8,
                lineCap: 'square',
                lineWidth: 2,
                size: 64,
                onStep: function(from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                }
            };
            $scope.dashboardItemsold = {
                barColor: "#9575cd",
                trackColor: 'rgba(0, 0, 0, 0.05)',
                scaleColor: false,
                scaleLength: 8,
                lineCap: 'square',
                lineWidth: 2,
                size: 64,
                onStep: function(from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                }
            };
            $scope.dashboardEarning = {
                barColor: "#4db6ac",
                trackColor: 'rgba(0, 0, 0, 0.05)',
                scaleColor: false,
                scaleLength: 8,
                lineCap: 'square',
                lineWidth: 2,
                size: 64,
                onStep: function(from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                }
            };


        } catch(e) {}


    // Chartist

        $scope.chartistData1 = {
          labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            series: [{
                label: 'Page Views',
                data: [{meta:'Page Views', value: 3},
                       {meta:'Page Views', value: 5},
                       {meta:'Page Views', value: 3},
                       {meta:'Page Views', value: 6},
                       {meta:'Page Views', value: 3},
                       {meta:'Page Views', value: 7},
                       {meta:'Page Views', value: 3},
                       {meta:'Page Views', value: 5},
                       {meta:'Page Views', value: 3},
                       {meta:'Page Views', value: 4},
                       {meta:'Page Views', value: 3},
                       {meta:'Page Views', value: 6}]
            },

            {
                label: 'Visitors',
                data: [{meta:'Visitors', value: 1},
                       {meta:'Visitors', value: 2},
                       {meta:'Visitors', value: 1},
                       {meta:'Visitors', value: 3},
                       {meta:'Visitors', value: 1},
                       {meta:'Visitors', value: 4},
                       {meta:'Visitors', value: 1},
                       {meta:'Visitors', value: 2},
                       {meta:'Visitors', value: 1},
                       {meta:'Visitors', value: 2},
                       {meta:'Visitors', value: 1},
                       {meta:'Visitors', value: 2}]
            }
            ]
        };

        $scope.chartistOptions1 = {
          height: 300,
          fullWidth: true,
          low: 0,
          high: 7,
          showArea: true,
          axisY: {
            onlyInteger: true,
            offset: 20
          },
          plugins: [
            $window.Chartist.plugins.tooltip()
          ]
        };

        $scope.chartistEvents1 = {
          draw: function(data) {
            if(data.type === 'point') {
                data.element.animate({
                  y1: {
                    begin: 100 * data.index,
                    dur: 2000,
                    from: data.y + 1000,
                    to: data.y,
                    easing: Chartist.Svg.Easing.easeOutQuint
                  },
                  y2: {
                    begin: 100 * data.index,
                    dur: 2000,
                    from: data.y + 1000,
                    to: data.y,
                    easing: Chartist.Svg.Easing.easeOutQuint
                  }
                });
            }

            if(data.type === 'line' || data.type === 'area') {
              data.element.animate({
                d: {
                  begin: 2000 * data.index,
                  dur: 2000,
                  from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                  to: data.path.clone().stringify(),
                  easing: Chartist.Svg.Easing.easeOutQuint
                }
              });
            }
          }
        };

        $scope.chartistData2 = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [{
                label: 'Sales',
                data: [{meta:'Sales', value: 2},
                       {meta:'Sales', value: 4},
                       {meta:'Sales', value: 3},
                       {meta:'Sales', value: 6},
                       {meta:'Sales', value: 2},
                       {meta:'Sales', value: 4},
                       {meta:'Sales', value: 3},
                       {meta:'Sales', value: 5},
                       {meta:'Sales', value: 1},
                       {meta:'Sales', value: 4},
                       {meta:'Sales', value: 2},
                       {meta:'Sales', value: 6}]
            }]
        };

        $scope.chartistOptions2 = {
          height: 258,
          lineSmooth: false,
          fullWidth: true,
          showArea: true,
          low: 0,
          high: 7,
          axisY: {
            onlyInteger: true,
            offset: 25,
            labelInterpolationFnc: function(value) {
              return '$' + value + 'K';
            }
          },
          plugins: [
            $window.Chartist.plugins.tooltip({prefix: "$", suffix: "000"})
          ]
        };

    // Chart.js

        $scope.radarData = {
            labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [65, 59, 90, 81, 56, 55, 40]
                },
                {
                    label: "My Second dataset",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [28, 48, 40, 19, 96, 27, 100]
                }
            ]
        };

        $scope.radarOptions = {
            showScale: true,
            scaleLineColor: "rgba(0,0,0,.05)",
            scaleLineWidth: 1,
            scaleShowLabels: false,
            scaleLabel: "<%=value%>",
            scaleFontFamily: "'Open Sans', 'Helvetica', 'Arial', sans-serif",
            scaleFontSize: 11,
            scaleFontStyle: "normal",
            scaleFontColor: "#666",
            responsive: false,
            maintainAspectRatio: true,
            showTooltips: true,
            customTooltips: false,
            tooltipFillColor: "rgba(0,0,0,0.8)",
            tooltipFontFamily: "'Open Sans', 'Helvetica', 'Arial', sans-serif",
            tooltipFontSize: 10,
            tooltipFontStyle: "normal",
            tooltipFontColor: "#fff",
            tooltipTitleFontFamily: "'Open Sans', 'Helvetica', 'Arial', sans-serif",
            tooltipTitleFontSize: 11,
            tooltipTitleFontStyle: "bold",
            tooltipTitleFontColor: "#fff",
            tooltipYPadding: 6,
            tooltipXPadding: 6,
            tooltipCaretSize: 8,
            tooltipCornerRadius: 2,
            tooltipXOffset: 10,
            tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
            multiTooltipTemplate: "<%= value %>",
        }
        // var ctx = document.getElementById("radarChart").getContext("2d");
        // var myRadarChart = new Chart(ctx).Radar(radarData, radarOptions);

  }]);
angular
  .module('theme.demos', [
    'oc.lazyLoad',
    'theme.demos.calendar',
    'theme.demos.canvas_charts',
    'theme.demos.chartist_charts',
    'theme.demos.nvd3_charts',
    'theme.demos.flot_charts',
    'theme.demos.morris_charts',
    'theme.demos.sparkline_charts',
    'theme.demos.ui_components',
    'theme.demos.basic_tables',
    'theme.demos.boxed_layout',
    'theme.demos.horizontal_layout',
    'theme.demos.dashboard',
    'theme.demos.chatbox',
    'theme.demos.gallery',
    'theme.demos.editable_table',
    'theme.demos.google_maps',
    'theme.demos.vector_maps',
    'theme.demos.ng_grid',
    'theme.demos.signup_page',
    'theme.demos.not_found',
    'theme.demos.error_page',
    'theme.demos.tasks',
    'theme.demos.mail',
  ])
  .directive('img', ['$timeout', function ($t) {
      // NOTE: this affects all <img> tags
      // Remove this directive for production
    'use strict';
      return {
      restrict: 'E',
      link: function (scope, element) {
        $t ( function () {
            var src = element.attr('src') || element.attr('ng-src');
          if (src.match(/assets\/demo/)) {
            element.attr('src', 'http://placehold.it/400&text=Placeholder');
          }
        }, 10);
      }
      };
  }]);

angular
  .module('themesApp', [
    'theme',
    'theme.demos',
  ])
  .config(['$provide', '$routeProvider', function($provide, $routeProvider) {
    'use strict';
    $routeProvider
      .when('/', {
        templateUrl: 'views/index.html',
        resolve: {
          loadChartsJs: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([
              'bower_components/Chart.js/Chart.min.js'
            ]);
          }]
        }
      })
      .when('/:templateFile', {
        templateUrl: function(param) {
          return 'views/' + param.templateFile + '.html';
        }
      })
      .when('#', {
        templateUrl: 'views/index.html',
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .directive('demoOptions', function () {
    return {
      restrict: 'C',
      link: function (scope, element, attr) {
        element.find('.demo-options-icon').click( function () {
          element.toggleClass('active');
        });
      }
    };
  })