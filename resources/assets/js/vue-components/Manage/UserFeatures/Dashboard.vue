<template>
	<div>
		<div class="container body-block">
			<nav>
				<ul class="nav nav-pills">
					<router-link tag="li" to="/merit-administrators" active-class="active">
						<a>Merit administrators</a>
					</router-link>
				</ul>
			</nav>
		</div>

		<router-view></router-view>
	</div>
</template>

<script>
import VueRouter from 'vue-router';

export default {
	router: new VueRouter({
		routes: [
			{
				path: '/merit-administrators',
				component: () => import('./MeritAdministrators.vue')
			}
		]
	})
};
</script>
