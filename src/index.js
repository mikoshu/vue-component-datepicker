import datePicker from './components/datePicker/datePicker.vue'

export function install(Vue) {
	if (install.installed) return;
	install.installed = true;
	Vue.component(datePicker.name, datePicker);
}


const plugin = {
	install,
};

let GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
}

// To allow use as module (npm/webpack/etc.) export component
export default datePicker;