var faCodePen = angular.module('faCodePen', [
    'famous.angular'
]);

faCodePen.controller('MainCtrl', ['$scope', '$famous',
    function ($scope, $famous) {
        var Transitionable  = $famous['famous/transitions/Transitionable'];
        var Easing          = $famous['famous/transitions/Easing'];
        var Transform       = $famous['famous/core/Transform'];
        var EventHandler    = $famous['famous/core/EventHandler'];

        var GenericSync     = $famous['famous/inputs/GenericSync'];
        var MouseSync       = $famous['famous/inputs/MouseSync'];
        var TouchSync       = $famous['famous/inputs/TouchSync'];

        GenericSync.register({
            'mouse': MouseSync,
            'touch': TouchSync
        });

        var menuAnimation = {
            duration: 500, curve: 'easeInOut'
        };


        function openMenu(email) {
            email.transitionable.email.set([-(window.innerWidth *.75), 0, 0], menuAnimation);
            email.transitionable.more.set([ -(window.innerWidth *.75), 0, 0], menuAnimation);
            email.transitionable.flag.set([ -(window.innerWidth *.50), 0, 0], menuAnimation);
            email.transitionable.trash.set([-(window.innerWidth *.25), 0, 0], menuAnimation);
        }

        function closeMenu(email) {
            email.transitionable.email.set([0,0,0], menuAnimation);
            email.transitionable.more.set( [0,0,0], menuAnimation);
            email.transitionable.flag.set( [0,0,0], menuAnimation);
            email.transitionable.trash.set([0,0,0], menuAnimation);
        }

        function handleSwipe(email) {
            var sync = new GenericSync(
                ['mouse', 'touch'],
                { direction: GenericSync.DIRECTION_X }
            );

            this.pageView.pipe(sync);

            sync.on('update', function(data) {
                this.pageView += data.delta;
                this.pageModifier.setTransform(Transform.translate(email.menuPos, 0, 0));
            }).bind(this);
        }

        $scope.mainScroll = new EventHandler();

        $scope.scrollOptions = {
            paginated: false,
            speedLimit: 5
        };

        $scope.toggleEmailMenu = function(email) {
            if(!email.isToggled) {
                openMenu(email);
                email.isToggled = true;
            } else {
                closeMenu(email);
                email.isToggled = false;
            }
        };

        $scope.getTaskMenuSize = function() {
            return [window.innerWidth / 4, undefined];
        };

        $scope.more = function(email) {
            console.info('more', email);
        };

        $scope.flag = function(email) {
            console.info('flag', email);
        };

        $scope.trash = function(email) {
            console.info('trash', email);
        };

        $scope.view = function(email) {
            console.info('view', email);
        };

        $scope.emails = [];
        for(var i = 0, j = 10; i < j; i++) {
            $scope.emails.push({
                from: "Joe Smith",
                title: "Email Title",
                message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis cumque dicta...",
                transitionable: {
                    email: new Transitionable([0,0,0]),
                    more:  new Transitionable([0,0,0]),
                    flag:  new Transitionable([0,0,0]),
                    trash: new Transitionable([0,0,0])
                },
                menuPos: 0
            });
        }
    }]);
