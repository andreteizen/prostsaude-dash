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
import Link from 'next/link'


export default function Notafiscal() {
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
                  <p className="h3">DARF</p>
                    <DataGrid
                          height='75vh'
                    keyExpr="documento"
                    rowAlternationEnabled={true}
                    allowColumnReordering={true}
                    allowColumnResizing={true}
                    showBorders={true}
                  >
                        <GroupPanel visible={true} />
                        <SearchPanel visible={true} highlightCaseSensitive={true} />
                        <Scrolling mode="infinite" />
                        <Column dataField="Tipo de documento" dataType="string"/>
                        <Column dataField="dat_insercao" caption="Data de Inserção" dataType="date" displayFormat="shortdate"/>
                        <Column dataField="dat_documento" caption="Data do Documento" dataType="date" displayFormat="shortdate"/>
                        <Column dataField="Download" dataType="string" />
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