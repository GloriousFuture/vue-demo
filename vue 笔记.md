
## vue2笔记 ##
### 基础教程 ###
1. **项目搭建**
	* 安装node.js 官网下载安装
	* # 全局安装 vue-cli  
	* $ npm install --global vue-cli
	* # 创建一个基于 webpack 模板的新项目
	* $ vue init webpack my-project
	* # 安装依赖
	* $ cd my-project
	* $ npm install
	* $ npm run dev

2. **项目结构**
 
		build-- 构建脚本目录
		confi-- 构建配置目录
		node_modules-- 以来的node工具包目录
		src-- 
			assets-- 资源目录
			components--组件目录
			App.vue-- 页面级组件
			main.js--页面入口js文件
		static--静态文件目录
		test--测试文件目录
		index.html--入口页面
		.eslintrc.js-- ES预发检查配置
		package.json--项目描述文件
3. **常用指令**

	1. v-if 条件渲染指令，根据其后表达式的bool值进行判断是否渲染该元素；
			
		HTML：

			<div id="example01">
			    <p v-if="male">Male</p>
			    <p v-if="female">Female</p>
			    <p v-if="age>25">Age:{{age}}</p>
			    <p v-if="name.indexOf('lin')>0">Name:{{name}}</p>
			</div>
		JS:

			var vm= new Vue({
			        el:"#example01",
			        data:{
			            male:true,
			            female: false,
			            age:29,
			            name:'colin'
			        }
			    })

	2. v-show 与v-if类似，只是会渲染其身后表达式为false的元素，而且会给这样的元素添加css代码：style="display:none";
	3. v-else 必须跟在v-if/v-show指令之后，不然不起作用；
	
		HTML：

			<div id="app">
				<h1 v-if="age >= 25">Age: {{ age }}</h1>
				<h1 v-else>Name: {{ name }}</h1>
				<hr>
				<h1 v-show="name.indexOf('cool') = 0">Name: {{ name }}</h1>
				<h1 v-else>Sex: {{ sex }}</h1>
			</div>
		JS:

			<script>
			    var vm = new Vue({
			        el: '#app',
			        data: {
			            age: 21,
			            name: 'keepcool',
			            sex: 'Male'
			        }
			    })
			</script>

	4. v-for  类似JS的遍历，用法为 v-for="item in items", items是数组，item为数组中的数组元素。
		
			HTML
		
				<ul id="example-1">
				  <li v-for="item in items">
				    {{ item.message }}
				  </li>
				</ul>
		
			JS
			
				var example1 = new Vue({
				  el: '#example-1',
				  data: {
				    items: [
				      {message: 'Foo' },
				      {message: 'Bar' }
				    ]
				  }
				})
4. **[事件处理器](https://cn.vuejs.org/v2/guide/events.html)**

	1. 可以用 v-on 指令监听 DOM 事件来触发一些 JavaScript 代码。

		HTML:
	
			div id="example-2">
			  <!-- `greet` 是在下面定义的方法名 -->
			  <button v-on:click="greet">Greet</button>
			</div>
			
		JS:
	
			var example2 = new Vue({
			  el: '#example-2',
			  data: {
			    name: 'Vue.js'
			  },
			  // 在 `methods` 对象中定义方法
			  methods: {
			    greet: function (event) {
			      // `this` 在方法里指当前 Vue 实例
			      alert('Hello ' + this.name + '!')
			      // `event` 是原生 DOM 事件
			      alert(event.target.tagName)
			    }
			  }
			})
	2. 事件修饰符
	
			<!-- 阻止单击事件冒泡 -->
			<a v-on:click.stop="doThis"></a>
			<!-- 提交事件不再重载页面 -->
			<form v-on:submit.prevent="onSubmit"></form>
			<!-- 修饰符可以串联  -->
			<a v-on:click.stop.prevent="doThat"></a>
			<!-- 只有修饰符 -->
			<form v-on:submit.prevent></form>
			<!-- 添加事件侦听器时使用事件捕获模式 -->
			<div v-on:click.capture="doThis">...</div>
			<!-- 只当事件在该元素本身（而不是子元素）触发时触发回调 -->
			<div v-on:click.self="doThat">...</div>

5. **[表单控件绑定](https://cn.vuejs.org/v2/guide/forms.html)**
	1. 基础用法
	
		你可以用 v-model 指令在表单控件元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。尽管有些神奇，但 v-model 本质上不过是语法糖，它负责监听用户的输入事件以更新数据，并特别处理一些极端的例子。

		v-model 并不关心表单控件初始化所生成的值。因为它会选择 Vue 实例数据来作为具体的值。
			
			<input v-model="message" placeholder="edit me">
			<p>Message is: {{ message }}</p>
			new Vue({
			  el: '...',
			  data: {
			    message: ''
			  }
			})
	2. 修饰符
		* .lazy: 在默认情况下， v-model 在 input 事件中同步输入框的值与数据 (除了 上述 IME 部分)，但你可以添加一个修饰符 lazy ，从而转变为在 change 事件中同步：
		
				<!-- 在 "change" 而不是 "input" 事件中更新 -->
				<input v-model.lazy="msg" >
		* .number: 如果想自动将用户的输入值转为 Number 类型（如果原值的转换结果为 NaN 则返回原值），可以添加一个修饰符 number 给 v-model 来处理输入值：

				<input v-model.number="age" type="number">
		* .trim: 如果要自动过滤用户输入的首尾空格，可以添加 trim 修饰符到 v-model 上过滤输入：

				<input v-model.trim="msg">
6. **.vue 文件**
	1. **每个.vue 文件分为三个模块**
		1. template：它定义了在页面中显示的内容，由于里面还有变量，也可以说定义了一个模版
		2. script：它定义这个组件中所需要的数据和及其操作（）
		3. style：style 里面是css 样式，定义这个组件的样式，scoped 表明这里写的css 样式只适用于该组件，可以限定样式的作用域
	2. **script 标签中 export defalut 后面的对象的理解。**
	
			在.vue文件中，export default 后面的对象 就相当于 new Vue() 构造函数中的接受
			的对象，它们都是定义组件所需要的数据（data）, 以及操作数 据的方法等， 更为全面
			的一个 export default 对象，有methods, data, computed, 这时可以看到, 这个
			对象和new Vue() 构造函数中接受的对象是一模一样的。但要注意data 的书写方式不
			同。在 .vue 组件, data 必须是一个函数，它return（返回一个对象），这个返回的对
			象的数据，供组件实现。
	3. **父子组件通讯**
		1. 父传子 通过 prop（prop 是单向绑定的：当父组件的属性变化时，将传导给子组件，但是不会反过来。这是为了防止子组件无意修改了父组件的状态——这会让应用的数据流难以理解。
		另外，每次父组件更新时，子组件的所有 prop 都会更新为最新值。这意味着你不应该在子组件内部改变 prop 。如果你这么做了，Vue 会在控制台给出警告）
			1. 传递了一个字符串
				
					<comp some-prop="1"></comp>
			2. 传递实际的 number 
					
					<comp v-bind:some-prop="1"></comp>
		子组件通过props接收（props:{numA:[ String , Number ]  //允许字符串 数字}）
		2. 子组件改变父组件值
		
				<comp :foo="bar" @update:foo="val => bar = val"></comp>
				当子组件需要更新 foo 的值时，它需要显式地触发一个更新事件：
				this.$emit('update:foo', newValue)
		3. 子组件索引
			
			尽管有 props 和 events ，但是有时仍然需要在 JavaScript 中直接访问子组件。为此可以使用 ref 为子组件指定一个索引 ID 。例如：

				<div id="parent">
				  <user-profile ref="profile"></user-profile>
				</div>
			
				var parent = new Vue({ el: '#parent' })
				// 访问子组件
				var child = parent.$refs.profile
			注意:

				$refs 只在组件渲染完成后才填充，并且它是非响应式的。它仅仅作为一个直接访问
				子组件的应急方案——应当避免在模版或计算属性中使用 $refs 。
		4. 子组件与子组件通信
		
			官网：在简单的场景下，使用一个空的 Vue 实例作为中央事件总线

				var bus = new Vue()
				// 触发组件 A 中的事件
				bus.$emit('id-selected', 1)
				// 在组件 B 创建的钩子中监听事件
				bus.$on('id-selected', function (id) {
				// ...
				})
7. **数组更新检测**
	###### 变异方法 ######
		Vue 包含一组观察数组的变异方法，所以它们也将会触发视图更新。这些方法如下：
		push()
		pop()
		shift()
		unshift()
		splice()
		sort()
		reverse()
	###### 重塑数组 ######

		变异方法(mutation method)，顾名思义，会改变被这些方法调用的原始数组。相比之下，也有非变异(non-mutating method)方法，例如： filter(), concat(), slice() 。这些不会改变原始数组，但总是返回一个新数组。当使用非变异方法时，可以用新数组替换旧数组：

			example1.items = example1.items.filter(function (item) {
			  return item.message.match(/Foo/)
			})
		你可能认为这将导致 Vue 丢弃现有 DOM 并重新渲染整个列表。幸运的是，事实并非如此。 Vue 实现了一些智能启发式方法来最大化 DOM 元素重用，所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作
	###### 注意事项 ######
	
	由于 JavaScript 的限制， Vue 不能检测以下变动的数组：
	* 当你利用索引直接设置一个项时，例如： vm.items[indexOfItem] = newValue
	* 当你修改数组的长度时，例如： vm.items.length = newLength

	为了解决第一类问题，以下两种方式都可以实现和 vm.items[indexOfItem] = newValue 相同的效果， 同时也将触发状态更新：

		// Vue.set
		Vue.set(example1.items, indexOfItem, newValue)
		// Array.prototype.splice`
		example1.items.splice(indexOfItem, 1, newValue)

	为了解决第二类问题，你也同样可以使用 splice：

		example1.items.splice(newLength)

	* 更新数组 Vue.set(this.array, index, val);
	* 删除元素 array.splice(index, 1);
	* 合并元素 array.concat(list);
### 参考链接
* [vue 官方文档](https://cn.vuejs.org/)
* [vue-resource官方文档](https://github.com/pagekit/vue-resource/tree/develop/docs)
* [element-ui官方文档](http://element.eleme.io/#/zh-CN/component/installation)
* [vue-router官方文档](https://router.vuejs.org/zh-cn/)
* [vuex官方文档](https://vuex.vuejs.org/zh-cn/)
* [Vue2.0学习笔记（基础篇）](http://www.imooc.com/article/16117)
* [基础使用](https://github.com/jianxiaoBai/vue_note/blob/master/README.md)

