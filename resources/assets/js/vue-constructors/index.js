import Vue from 'vue';

Vue.directive('visible', (el, {value, oldValue, modifiers}) => {
	if(modifiers.once && el.style.visibility === 'visible')
		return;
	
	if(value !== oldValue){
		el.style.transition = oldValue
			? 'opacity 0.1s ease-out, visibility 0s 0.1s'
			: 'opacity 0.1s ease-out';
		
		el.style.visibility = value
			? 'visible'
			: 'hidden';
		el.style.opacity = value
			? 1
			: 0;
	}
});
