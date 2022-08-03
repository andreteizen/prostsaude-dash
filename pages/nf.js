import React from 'react';
import DataGrid, {
  Column,
  Grouping,
  GroupPanel,
  Scrolling,
  Pager,
  Paging,
  SearchPanel,
  MasterDetail,
  Button,
  FilterRow,
  Editing
} from 'devextreme-react/data-grid';
import Login from '../components/login.js'
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Sidebar from '../components/sidebar.js'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import CustomStore from 'devextreme/data/custom_store';
import connect from '../utils/database.js';


export default function Notafiscal({ data }) {
  const { data: session } = useSession();

  if(session){
      return (
      
          <div className="Main">
            <Row className="h-100 w-100 p-0 m-0">
                <Col md="auto" className="p-0 m-0">
                <Sidebar />
                </Col>
                <Col className="p-0 m-0">
                <Row className="topbar p-0 mx-0 my-2 align-items-center justify-content-start">
                    <Col md={1}>
                    <Image
                        src="/avatar.png"
                        alt="Imagem"
                        width={50}
                        height={50}
                    />
                    </Col>
                    <Col md={2} className="text-right">
                    <dt className="text-dark">User Name</dt>
                    </Col>
                    </Row>
                <Row className="main-page p-0 m-0 align-items-center justify-centent-center">
                <div className="p-4 h-100">
                  <p className="h3">Notas fiscais</p>
                    <DataGrid
                      height='75vh'
                      keyExpr="_id"
                      rowAlternationEnabled={true}
                      allowColumnReordering={true}
                      allowColumnResizing={true}
                      showBorders={true}
                      dataSource={data}
                    >
                      <FilterRow visible={true} />
                      <Editing 
                        allowAdding={true}
                      />
                      <GroupPanel visible={true} />
                      <SearchPanel visible={true} highlightCaseSensitive={true} />
                      <Scrolling mode="infinite" />
                      <Column dataField="tipo_documento" caption="Tipo documento" dataType="string"/>
                      <Column dataField="dat_insercao" caption="Data de Inserção" dataType="date" displayFormat="shortdate"/>
                      <Column dataField="dat_documento" caption="Data do Documento" dataType="date" displayFormat="shortdate"/>
                      <Column dataField="arquivo_pdf" caption="Arquivo" dataType="string" />
                    </DataGrid>
                </div>
                </Row>
              </Col>
            </Row>
          </div>
      )
  }
  else {
    return (
    <Login/>
  );
  }
}

export async function getServerSideProps({ req, res }) {
  const { db } = await connect();

  if (req.method == 'GET'){
      var data = await db
        .collection('documentos')
        .find({})
        .toArray();

      data = JSON.stringify(data);
      data = JSON.parse(data);
      return {props: { data }}
    }

   // will be passed to the page component as props
  
}
