import { Excel } from "@/components/excel/Excel";
import { Toolbar } from "@/components/toolbar/toolbar";
import { Header } from "@/components/header/Header";
import { Formula } from "@/components/fromula/formula";
import { Table } from "@/components/table/Table";
import './scss/index.scss'

const excel = new Excel('#app', {
   components: [Header, Toolbar, Formula, Table]
})

excel.render()

