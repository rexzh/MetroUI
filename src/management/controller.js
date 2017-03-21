app.controller('ManagementCtrl', function ($rootScope, $scope, MetaResource, $location, $L, resetMenu) {
    $scope.resetMenu = resetMenu;

    $scope.home = $L("Home");
    $scope.management = $L("Management");
    $scope.block = $L("Block Name");
    $scope.boxContent = $L("Box Content Settings");
    $scope.blockContent = $L("Block Content Settings");    
    $scope.gasContent = $L("Gas Content Settings");
    $scope.saveBoxButton = $L("Save");
    $scope.saveBlockButton = $L("Save");

    if (!$rootScope.auth) {
        $location.path("/auth/");
    } else {
        $rootScope.auth = false;
    }

    function emptyGas() {
        var g = [];
        for (var i = 0; i < 7; i++)
            g.push({ gasId: i + 1 });
        return g;
    };

    $scope.gas = emptyGas();

    function boxItems(boxes) {
        var pages = [];
        for (var k = 0; k < boxes.length; k++) {
            var b = [];
            for (var i = 0; i < 16; i++) {
                var line = [];
                for (var j = 0; j < 5; j++) {
                    var x = i * 5 + j + 1;
                    if (x < 10)
                        line.push({ name: '#0' + x, value: x });
                    else
                        line.push({ name: '#' + x, value: x });
                }
                b.push(line);
            }
            b.name = boxes[k].name;
            b.id = boxes[k].id;
            pages.push(b);
        }
        return pages;
    };

    MetaResource.queryBoxes().then(function (data) {        
        var boxes = [];
        for (var i = 0; i < data.length; i++) {
            boxes.push({"id": data[i].boxId, "name": data[i].name});
        }
        var btns = boxItems(boxes);

        $scope.buttons = btns.reverse();
        $scope.boxId = btns[0].id;
        $scope.boxName = btns[0].name;
    }, function (err) {
        err.scope = $scope;
        $scope.$emit('ajaxError', err);
    });

    var target = null;
    $scope.clickItem = function (item, evt) {
        $scope.blockId = item.value;

        if (target) {
            $(target).removeClass('btn-success');
        }
        target = evt.target;
        $(evt.target).addClass('btn-success');

        MetaResource.queryBlock($scope.boxId, $scope.blockId).then(function (data) {
            $scope.blockName = data.name;
            $scope.gas = data.sensors;
        }, function (err) {
            err.scope = $scope;
            $scope.$emit('ajaxError', err);
        });
    }

    $scope.tabChanged = function (tab) {
        $scope.boxId = tab.tabId;
        $scope.boxName = tab.tabHeader;

        $scope.blockId = null;
        $scope.blockName = null;
        $scope.gas = emptyGas();
        $(target).removeClass('btn-success');
        target = null;
    };

    $scope.saveBox = function () {
        MetaResource.saveBox({ "boxId": parseInt($scope.boxId), "name": $scope.boxName }).then(function (data) {
            $scope.$emit('save', $L('Box Content Settings'));
            for (var i = 0; i < $scope.buttons.length; i++) {
                if ($scope.buttons[i].id == $scope.boxId) {
                    $scope.buttons[i].name = $scope.boxName;
                }
            }
        }, function (err) {
            err.scope = $scope;
            $scope.$emit('ajaxError', err);
        });
    }

    $scope.saveBlock = function () {
        MetaResource.saveBlock({ boxId: parseInt($scope.boxId), id: $scope.blockId, name: $scope.blockName, sensors: $scope.gas }).then(function (data) {
            $scope.$emit('save', $L('Box Content Settings'));
        }, function (err) {
            err.scope = $scope;
            $scope.$emit('ajaxError', err);
        });
    }
});