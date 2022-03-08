<template>
	<div id="app">
		<div id="nav">
			<div>
				<login />
				<ul>
					<li><router-link to="/board">게시판</router-link></li>
					<li><router-link to="/">학과</router-link></li>
					<li><router-link to="/profs">교수진</router-link></li>
					<li><router-link to="/students">재학생</router-link></li>
				</ul>
			</div>
		</div>
		<router-view />
	</div>
</template>

<style>
@import url("./assets/reset.css");
@import url("./assets/style.css");
@import url("./assets/responsive.css");
</style>

<script>
import login from "./components/login.vue";

export default {
	name: "app",
	components: {
		login,
	}
};
</script>
