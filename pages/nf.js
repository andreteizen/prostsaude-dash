import React, { useState, useEffect } from 'react';
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
  Toolbar,
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
import axios from "axios";
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';


export default function Notafiscal({ data }) {
  const { data: session } = useSession();
  const router = useRouter();

  const headers = {
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  }

  const [dadosNotaFiscal, setDadosNotaFiscal] = useState(data.filter(tipoDoc => tipoDoc.tipo_documento === 'Nota Fiscal'));
  const [dadosDarf, setDadosDarf] = useState(data.filter(tipoDoc => tipoDoc.tipo_documento === 'DARF'));

  useEffect(() => {
    setDadosNotaFiscal(data.filter(tipoDoc => tipoDoc.tipo_documento === 'Nota Fiscal'))
  }, [data])

  useEffect(() => {
    setDadosDarf(data.filter(tipoDoc => tipoDoc.tipo_documento === 'DARF'))
  }, [data])

  const [pdfUploaded, setPdfUploaded] = useState(null);

  const [isAdmin, setIsAdmin] = useState((session?.user?.email === "contato@prostsaude.com"));

  const onDownloadButtonClick = async function downloadPdf(data) {
    fetch(data.row.data.thumb)
			.then(response => {
				response.blob().then(blob => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement('a');
          const tipoDocumento = data.row.data.thumb.split('.')
					a.href = url;
					a.download = `${data.row.data.dat_documento}_${data.row.data.tipo_documento}.${tipoDocumento[tipoDocumento.length - 1]}`;
					a.click();
				});
		});
  };


  const orderDateFormat = "dd/MM/yyyy";

  // Função para deletar
  const onDeleteButtonClick = async function deleteData(data) {
      await axios.delete(`/api/delete/${data.row.data._id}`)
        .then(setTimeout(() => { 
          router.reload(window.location.pathname)
        }, 300));
  }

  const insertData = async (data) => {
    const email_saving = (typeof data?.data?.email === 'undefined') ? session?.user?.email : data.data.email

    await axios.post('/api/insert/document', {
          email: email_saving,
          dat_documento: data.data.dat_documento,
          tipo_documento: data.data.tipo_documento,
          file: pdfUploaded
        }, {
          headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(setTimeout(() => { 
          router.reload(window.location.pathname)
        }, 1500))
        .catch((err) => {
            console.log(err)
        })
  }

  useEffect(() => {
    setIsAdmin(session?.user?.email === "contato@prostsaude.com");
  });

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
                      <span>Olá, <strong>{session?.user?.name}</strong></span>
                    </Col>
                    </Row>
                <Row className="main-page p-0 m-0 align-items-center justify-centent-center">
                <div className="p-4 h-100">
                  <p className="h3">Notas fiscais</p>
                    <DataGrid
                      className='mb-5'
                      height='50vh'
                      keyExpr="_id"
                      rowAlternationEnabled={true}
                      allowColumnReordering={true}
                      allowColumnResizing={true}
                      showBorders={true}
                      dataSource={dadosNotaFiscal}
                      onRowInserting={
                        (data) => {
                          insertData(data)
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
                            <Item dataField="email" visible={isAdmin} />
                            <Item dataField="tipo_documento" />
                            <Item dataField="dat_documento" />
                            <Item dataField="arquivo_pdf">
                              <FileUploader 
                                  selectButtonText="Selecionar documento"
                                  invalidMaxFileSizeMessage='Arquivo maior que 16MB'
                                  maxFileSize={16000000}
                                  uploadHeaders={headers}
                                  onUploaded={
                                    (data) => {
                                      setPdfUploaded(data?.file);
                                    }
                                  }
                              />
                            </Item>
                          </Item>
                        </Form>

                      </Editing>
                      <GroupPanel visible={true} />
                      <SearchPanel visible={true} highlightCaseSensitive={true} />
                      <Scrolling mode="infinite" />
                      <Column dataField="email" caption="Email do responsável" dataType="string" visible={isAdmin}/>
                      <Column dataField="tipo_documento" caption="Tipo documento">
                        <Lookup dataSource={tiposDocumento} valueExpr="tipo" displayExpr="tipo" />
                      </Column>
                      <Column dataField="dat_insercao" caption="Data de Inserção" dataType="date" format={orderDateFormat}/>
                      <Column dataField="dat_documento" caption="Data do Documento" dataType="date" defaultSortOrder="desc" format={orderDateFormat}/>
                      <Column type='buttons'>
                        <Button icon='download'
                          onClick={onDownloadButtonClick}
                        />
                        <Button name='delete'
                          onClick={onDeleteButtonClick}
                        />
                      </Column>
                    </DataGrid>

                    <p className="h3">DARF</p>
                    <DataGrid
                      className='mb-5'
                      height='50vh'
                      keyExpr="_id"
                      rowAlternationEnabled={true}
                      allowColumnReordering={true}
                      allowColumnResizing={true}
                      showBorders={true}
                      dataSource={dadosDarf}
                      onRowInserting={
                        (data) => {
                          insertData(data)
                        }
                      }
                    >
                      <FilterRow visible={true} />
                      <Editing 
                        allowAdding={false}
                        allowDeleting={true}
                        mode="popup"
                        useIcons={true}
                      >  </Editing>
                      <GroupPanel visible={true} />
                      <SearchPanel visible={true} highlightCaseSensitive={true} />
                      <Scrolling mode="infinite" />
                      <Column dataField="email" caption="Email do responsável" dataType="string" visible={isAdmin}/>
                      <Column dataField="tipo_documento" caption="Tipo documento">
                        <Lookup dataSource={tiposDocumento} valueExpr="tipo" displayExpr="tipo" />
                      </Column>
                      <Column dataField="dat_insercao" caption="Data de Inserção" dataType="date" format={orderDateFormat}/>
                      <Column dataField="dat_documento" caption="Data do Documento" dataType="date" defaultSortOrder="desc" format={orderDateFormat}/>
                      <Column type='buttons'>
                        <Button icon='download'
                          onClick={onDownloadButtonClick}
                        />
                        <Button name='delete'
                          onClick={onDeleteButtonClick}
                        />
                      </Column>
                    </DataGrid>
                    

                    <p className="h3">Todos os documentos</p>
                    <DataGrid
                      height='50vh'
                      keyExpr="_id"
                      rowAlternationEnabled={true}
                      allowColumnReordering={true}
                      allowColumnResizing={true}
                      showBorders={true}
                      dataSource={data}
                      onRowInserting={
                        (data) => {
                          insertData(data)
                        }
                      }
                    >
                      <FilterRow visible={true} />
                      <Editing 
                        allowAdding={false}
                        allowDeleting={true}
                        mode="popup"
                        useIcons={true}
                      > </Editing>
                      <GroupPanel visible={true} />
                      <SearchPanel visible={true} highlightCaseSensitive={true} />
                      <Scrolling mode="infinite" />
                      <Column dataField="email" caption="Email do responsável" dataType="string" visible={isAdmin}/>
                      <Column dataField="tipo_documento" caption="Tipo documento">
                        <Lookup dataSource={tiposDocumento} valueExpr="tipo" displayExpr="tipo" />
                      </Column>
                      <Column dataField="dat_insercao" caption="Data de Inserção" dataType="date" format={orderDateFormat}/>
                      <Column dataField="dat_documento" caption="Data do Documento" dataType="date" defaultSortOrder="desc" format={orderDateFormat}/>
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
  const session = await getSession({ req });

  if(session) {
    const { db } = await connect();

      if(session?.user?.email !== 'contato@prostsaude.com'){
        var data = await db
          .collection(process.env.MONGODB_COLLECTION)
          .find({ email: session?.user?.email })
          .toArray();
  
        data = JSON.stringify(data);
        data = JSON.parse(data);
        return {props: { data }}
      }
      else {
        var data = await db
          .collection(process.env.MONGODB_COLLECTION)
          .find({ })
          .toArray();
  
        data = JSON.stringify(data);
        data = JSON.parse(data);
        return {props: { data }}
      }
  }

  return {props: { data: '' }}
}
