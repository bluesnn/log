<template>
  <div>

    <Row class="margin-top-10">
      <Col span="24">
      <Card>
        <p slot="title">
          log list
        </p>
        <div class="edittable-table-height-con">
          <can-edit-table refs="table2" :edit='true' v-model="datalist" :columns-list="columnsName"
            :loading="isLoading" >
          </can-edit-table>
        </div>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import service from "@/api";
import Util from "@/libs/util";
import canEditTable from "@/components/table/canEditTable.vue";
export default {
  name: "log",
  components: {
    canEditTable
  },
  data() {
    return {
      datalist: [
        {
           id:"11",
          date: "2018-06-07",
          log: ["2018-06-07.log"],
          logSystem: ["2018-05-30.log"],
          production: ["2018-05-30.log"],
          test: ["2018-05-30-11-31-29.229.log"]
        },
         {
          id:"12",
          date: "2018-06-06",
          log: ["2018-06-06","2018-06-07"],
          logSystem: ["2018-05-30.log","2018-05-30.log"],
          production: ["2018-05-30.log",'2018-05-30.log'],
          test: ["2018-05-30-11-31-29.229.log",'2018-05-30.log']
        }
      ],
      isLoading: true,
      total: null,
      addmodal: false,
      modeledit: false,
      articleTagList: [],
      edit: "",
      exportList: [],
      exportListid: [],
      isSearch: false,
      formsearch: {
        name: "",
        ruleGroupId: "",
        exporterGroupId: ""
      },
      typeList: [],
      tagslist: [], // 选中的标签
      columnsName: [
        {
          title: "id",
          align: "center",
          key: "id",
          editable: true
        },
        {
          title: "date",
          align: "center",
          key: "date",
          editable: true
        },
        {
          title: "logSystem",
          align: "center",
          key: "logSystem",
          editable: true,
          render: (h, params) => {
            return h(
              "Poptip",
              {
                props: {
                  trigger: "hover",
                  title: params.row.logSystem.length + "个",
                  placement: "bottom"
                }
              },
              [
                h("Tag", params.row.logSystem.length),
                h(
                  "div",
                  {
                    slot: "content"
                  },
                  [
                    h(
                      "ul",
                      params.row.logSystem.map(item => {
                        return h(
                          "li",
                          {
                            style: {
                              textAlign: "left",
                              padding: "4px"
                            }
                          },
                          [
                            h(
                              "Tag",
                              {
                                props: {
                                  type: "dot",
                                  color: "blue"
                                }
                              },
                              item
                            )
                          ]
                        );
                      })
                    )
                  ]
                )
              ]
            );
          }
        }
      ]
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.isLoading = true;
      service
        .getMenu()
        .then(res => {
          console.log(res);
          // this.datalist = Array.from(res.data);
          this.isLoading = false;
        })
        .catch(err => {
          console.log(err, "err");
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>