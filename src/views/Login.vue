<template>
  <section class="content">
    <div class="container-fluid" width="300">
      <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-4">
          <div class="card card-primary">
            <div class="card-header">
              <h3 class="card-title">Login</h3>
            </div>
            <form id="quickForm">
              <div class="card-body">
                <div class="form-group">
                  <label for="login">Login</label>
                  <input
                    type="number"
                    name="login"
                    class="form-control"
                    id="login"
                    placeholder="Enter login"
                  />
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    class="form-control"
                    id="password"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div class="card-footer">
                <button type="submit" class="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
        <div class="col-md-4"></div>
      </div>
    </div>
  </section>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
	name: "Login",
	data() {
		return {
			form: {
				login: "",
				password: "",
			},
		};
	},
	validations: {
		form: {
			login: { required },
			password: { required },
		},
	},
};
</script>
