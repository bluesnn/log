<style lang="less">
@import "./login.less";
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from "js-cookie";
import service from "@/api";
export default {
  data() {
    return {
      form: {
        password: "10086"
      },
      rules: {
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          service
            .Login(this.form)
            .then(res => {
              this.$Message.success("登录成功");
              Cookies.set("id_token", res.data);
              Cookies.set("user", "admin");
              setTimeout(() => {
                this.$router.push({
                  name: "home"
                });
              }, 1000);
            })
            .catch(err => {
              this.$Message.error(err.data.msg);
            });
        }
      });
    }
  }
};
</script>

<style>
</style>
