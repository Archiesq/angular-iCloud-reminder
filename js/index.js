	var reminder=angular.module('reminder',[]);
	reminder.filter('search',[function(){
		return function(e,key){
			var xx=function(items){
				for(var i=0;i<items.length;i++){
					if(items[i].title.indexOf(key)!= -1){
						return true;
					}
				}
				return false;
			}
			
			var r=[];
			for (var i =0; i<e.length;i++) {
				if(e[i].name.indexOf(key)!= -1){
					r.push(e[i]);
				}
				if(xx(e[i].items)){
					r.push(e[i]);
				}
			}

			return r;

		}
	}])
	reminder.controller('rdCtrl', ['$scope', function($scope){
		var d=localStorage.data;
		$scope.shijianliebiao =d?JSON.parse(d):[];

		//angular.copy 深拷贝一个对象或数组
		//$scope.copy=angular.copy($scope.shijianliebiao)
		$scope.colors=['purple','red','yellow','green','blue','brow','orange'];
		$scope.addshijian=function(){
			var data={
				name:'新列表 '+($scope.shijianliebiao.length+1),
				color:$scope.colors[$scope.shijianliebiao.length%7],
				items:[]
			}
			$scope.shijianliebiao.push(data);
			localStorage.data = JSON.stringify($scope.shijianliebiao);
		}
		$scope.clistindex=0;
		$scope.showshijian=function(i){
			$scope.clistindex=i;
			$scope.key=null;
		}
		$scope.delliebiao=function(){
			var r=[];
			for (var i=0;i<$scope.shijianliebiao.length; i++){
					if(i != $scope.clistindex){
				r.push($scope.shijianliebiao[i]);
				}
		}
			$scope.shijianliebiao=r;
			$scope.clistindex = 0;
			localStorage.data = JSON.stringify($scope.shijianliebiao);
		}
		$scope.countDone=function(){
			var r=0;
			var lis=$scope.shijianliebiao[$scope.clistindex].items;
			for(var i=0;i<lis.length;i++){
				if(lis[i].isDone){
					r+=1;
				}
			}
			return r;
		}
		$scope.addTodo =function(){
			var list = $scope.shijianliebiao[$scope.clistindex];
			var data = {title:'新条目'+(list.items.length+1),isDone:false};
			list.items.push(data);
			localStorage.data=JSON.stringify($scope.shijianliebiao);
		}
		 $scope.deleteTodo = function(index) {
		    var r = [];
		    var list = $scope.shijianliebiao[$scope.clistindex]; 
		    for(var i=0 ; i<list.items.length; i++){
		      if( i != index){
		        r.push(list.items[i]);
		      }
		    } 
		    $scope.shijianliebiao[$scope.clistindex].items = r; 
		    localStorage.data = JSON.stringify($scope.shijianliebiao);
		}
		$scope.save = function() {
    	localStorage.data = JSON.stringify($scope.shijianliebiao);
	}
		
	}])

