class PageClass {                               //定义一个分页器类      
	constructor(ele, pageNum, page, cb) {   //需要传入4个参数，第一个容器元素，第二个页面总数，第三个当前页面数，第四个为回调函数
		this.ele = ele;            //定义属性
		this.pageNum = pageNum;
		this.page = page;
		this.cb = cb;
		this.renderPage();     //执行渲染的方法
		this.operate();         //给实例化对象绑定各种操作的方法
		this.handleActionBtns();
	}
	renderPage() {                   //在类的原型上定义一个渲染的方法
		let str = '';
		if (this.pageNum > 3) {     //判断当前分页的页面总数是否超过3页
			if (this.page <= 2) {         //如果页面总数大于3  ，再判断当前页是否小于或者等于第四页
				for (let i = 0; i < 3; i++) {        //如果当前页是小于等于3以内的页数 ，遍历1到5
					if ((i + 1) == this.page) {       //判断当前页是否等于 当前   索引值（索引值从0开始） +  1
						str += `<span class="pageStyle" myPage="${i + 1}"><a href="javascript:;" class="pageStyle-active">${i + 1}</a></span>`;//等于的话说明渲染的是当前页，给当前页一个pageStyle-active的类名进行渲染
					} else {  //如果渲染的不是当前页
						str += `<span class="pageStyle" myPage="${i + 1}"><a href="javascript:;">${i + 1}</a></span>`;//普通渲染就行了
					}
				}
				str += `<span><i>•••</i></span><span class="pageStyle" myPage="${this.pageNum}"><a href="javascript:;">${this.pageNum}</a></span>`;//最后渲染一个最末尾页
			} else if (this.page > 2 && this.page < this.pageNum - 1) {   //判断当前页是否大于第四页，且小于最大页数减去 1 
				str += `<span class="pageStyle" myPage="1"><a href="javascript:;">1</a></span><span><i>•••</i></span>`; //渲染一个首页
				for (let i = this.page - 1; i < this.page + 1; i++) {
					if ((i + 1) == this.page) { //判断当前正在渲染的是否为当前页
						str += `<span class="pageStyle" myPage="${i + 1}"><a href="javascript:;" class="pageStyle-active">${i + 1}</a></span>`;//如果是当前页，给一个pageStyle-active类名进行渲染
					} else {
						str += `<span class="pageStyle" myPage="${i + 1}"><a href="javascript:;">${i + 1}</a></span>`;//如果不是，普通渲染就行
					}
				}
				str += `<span><i>•••</i></span><span class="pageStyle" myPage="${this.pageNum}"><a href="javascript:;">${this.pageNum}</a></span>`;//渲染一个尾页
			} else if (this.page >= this.pageNum - 1) {//如果当前页数大于或者等于最大页数 - 1 
				str += `<span class="pageStyle" myPage="1"><a href="javascript:;">1</a></span><span><i>•••</i></span>`; //渲染一个首页
				for (let i = this.pageNum - 3; i < this.pageNum; i++) {//从倒数第5页开始渲染
					if ((i + 1) == this.page) {   //如果渲染的是当前页
						str += `<span class="pageStyle" myPage="${i + 1}"><a href="javascript:;" class="pageStyle-active">${i + 1}</a></span>`;//增加一个pageStyle-active类名，进行渲染
					} else {
						str += `<span class="pageStyle" myPage="${i + 1}"><a href="javascript:;">${i + 1}</a></span>`;//否则普通渲染
					}
				}
			}
		} else {        //如果最大页数小于等于3
			for (let i = 0; i < this.pageNum; i++) {     //直接渲染到当前最大页数
				if ((i + 1) == this.page) {           //判断渲染的是否为当前页数
					str += `<span class="pageStyle" myPage="${i + 1}"><a href="javascript:;" class="pageStyle-active">${i + 1}</a></span>`;//如果是增加一个pageStyle-active类名，进行渲染
				} else {
					str += `<span class="pageStyle" myPage="${i + 1}"><a href="javascript:;">${i + 1}</a></span>`;//否则普通渲染就行了
				}
			}
		}
		//将所有内容渲染到容器盒子里
		//上一页
		//下一页
		this.ele.innerHTML = `
		<a class='prev-box' id='prev-box' href="javascript:;">
		<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g class="pre-icon">
              <path  d="M12.5 7L3.5 7" stroke="#171717" stroke-linecap="square" />
              <path  d="M6.49999 10.5L3 7L6.49999 3.5" stroke="#171717" stroke-linecap="square" />
            </g>
            <g  clip-path="url(#clip0_3322_42577)"></g>
            <defs>
              <clipPath>
                <rect width="14" height="14" fill="white" />
              </clipPath>
            </defs>
          </svg>
		  <span class='pre-title'>Previous</span>
		  </a></span>
        ${str}
      <a class="next-box" id="next-box" href="javascript:;">
	  <span class='next-title'>Next</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g  clip-path="url(#clip0_3322_42419)">
            <g class="next-icon">
              <path  d="M3 7L12 7" stroke="#171717" stroke-linecap="square" />
              <path d="M9.00001 10.5L12.5 7L9.00001 3.5" stroke="#171717" stroke-linecap="square" />
            </g>
          </g>
          <defs>
            <clipPath >
              <rect width="14" height="14" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </a>
    </span>` ;
	}
	operate() {                  //在类原型上定义一个operate的方法，给这个类绑定点击事件
		const _that = this;        //申明一个常量接收this
		let nextEle = this.ele.querySelector(".next-box");      //获取下一页的元素
		let prevEle = this.ele.querySelector(".prev-box");      //获取上一页的元素
		let pageStyleEles = this.ele.querySelectorAll(".pageStyle");    //获取所有的中间页面的元素

		nextEle.onclick = function () {      //当点击下一页时
			if (_that.page < _that.pageNum) {   //先判断当前页是否小于最大页
				_that.page = _that.page + 1;   //如果没有超过，给page属性自增1
				_that.cb(_that.page);           //并将page属性通过回调函数cb传递出去
			}
		}
		prevEle.onclick = function () {      //当点击上一页时
			if (_that.page > 1) {           //先判断当前页是否大于第一页
				_that.page = _that.page - 1;   //如果是大于第一页的话，page属性自减1
				_that.cb(_that.page);           //并将page属性通过回调函数cb传递出去
			}
		}
		pageStyleEles.forEach(function (pageStyleEle) {       //遍历获取到中间页面的所有元素
			pageStyleEle.onclick = function () {                //当点击其中一页时
				_that.page = parseInt(this.getAttribute("myPage")); //获取这个元素自定义属性，myPage，属性值是当前页 ，并将当前页赋值给page属性
				_that.cb(_that.page);                           //将page属性通过回调函数cb传递出去
			}
		});
	}

	// 处理pre 和 next按钮
	handleActionBtns() {
		let _that = this;
		let pageStyleEles = this.ele.querySelectorAll(".pageStyle-active");
		let nextEle = document.getElementById("next-box");      //获取下一页的元素
		let prevEle = document.getElementById("prev-box");      //获取上一页的元素
		// if(pageStyleEles.getAttribute())
		pageStyleEles.forEach((elements) => {
			console.log(elements);
			const curSel = elements.textContent;
			if (curSel == 1) {
				prevEle.classList.add("prev-box-not-active");
			} else {
				prevEle.classList.remove("prev-box-not-active");
			}
			if (curSel == _that.pageNum) {
				nextEle.classList.add("next-box-not-active");
			} else {
				nextEle.classList.remove("next-box-not-active");
			}
		})

	}
}