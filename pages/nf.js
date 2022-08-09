import React, { useState } from 'react';
import DataGrid, {
  Column,
  GroupPanel,
  Scrolling,
  SearchPanel,
  FilterRow,
  Editing,
  Popup,
  Form,
  Item,
  Button
} from 'devextreme-react/data-grid';
import Login from '../components/login.js'
import { useSession, signIn, signOut } from "next-auth/react"
import Sidebar from '../components/sidebar.js'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'next/image'
import connect from '../utils/database.js';
import { tiposDocumento } from '../utils/data.js';
import { Lookup } from 'devextreme-react/filter-builder.js';
import FileUploader from 'devextreme-react/file-uploader';
import insertData from '../utils/insertData.js';
import downloadData from '../utils/downloadData.js';
import axios from "axios";
import { useRouter } from 'next/router';


export default function Notafiscal({ data }) {

  const { data: session } = useSession();

  const [pdfUploaded, setPdfUploaded] = useState(null);

  const router = useRouter();


  const onDownloadButtonClick = downloadData;

  // Função para deletar
  const onDeleteButtonClick = async function deleteData(data) {
      await axios.delete(`/api/delete/${data.row.data._id}`)
        .then(setTimeout(() => { 
          router.reload(window.location.pathname)
        }, 300));
  }
  
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
                    <dt className="text-dark">{session?.user?.name}</dt>
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
                      onRowInserting={
                        (data) => {
                          insertData(data, pdfUploaded, session?.user?.email)
                        }
                      }
                    >
                      <FilterRow visible={true} />
                      <Editing 
                        allowAdding={true}
                        allowDeleting={true}
                        mode="popup"
                        useIcons={true}
                      >
                        <Popup title="Adicionar documento" showTitle={true} width={450} height="auto" />
                        <Form>
                          <Item itemType="group" colCount={1} colSpan={2}>
                            <Item dataField="tipo_documento" />
                            <Item dataField="dat_documento" />
                            <Item dataField="arquivo_pdf">
                              <FileUploader 
                                selectButtonText="Selecionar documento"
                                invalidMaxFileSizeMessage='Arquivo maior que 16MB'
                                maxFileSize={16000000}
                                onUploaded={(data) => {setPdfUploaded(data)}}
                              />
                              <span>Tamanho máximo do arquivo: 16 MB.</span>
                            </Item>
                          </Item>
                        </Form>

                      </Editing>
                      <GroupPanel visible={true} />
                      <SearchPanel visible={true} highlightCaseSensitive={true} />
                      <Scrolling mode="infinite" />
                      <Column dataField="tipo_documento" caption="Tipo documento">
                        <Lookup dataSource={tiposDocumento} valueExpr="tipo" displayExpr="tipo" />
                      </Column>
                      <Column dataField="dat_insercao" caption="Data de Inserção" dataType="date" displayFormat="shortdate"/>
                      <Column dataField="dat_documento" caption="Data do Documento" dataType="date" displayFormat="shortdate"/>
                      <Column type='buttons'>
                        <Button icon='download'
                          onClick={onDownloadButtonClick}
                        />
                        <Button name='delete'
                          onClick={onDeleteButtonClick}
                        />
                      </Column>
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
