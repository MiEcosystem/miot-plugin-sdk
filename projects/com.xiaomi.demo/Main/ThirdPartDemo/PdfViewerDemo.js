import React from 'react';
import { Host } from "miot";
import { StyleSheet, Dimensions, View, Button } from 'react-native';
// import Pdf from 'react-native-pdf';
import { PdfViewer } from 'miot/ui';

export default class PdfViewerDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      source: { uri: null }
    };
  }

  componentWillMount() {
    // this.loadFile();
    // this.loadLocalFile();
  }


  render() {
    // const source = {uri:'http://samples.leanpub.com/thereactnativebook-sample.pdf',cache:true};
    // let source ={uri:null};
    // if(this.state.pdfFile.url){
    //   console.log('-------render: url0',JSON.stringify(this.state.pdfFile));
    //   source ={uri:this.state.pdfFile.url};
    // }
    

    const source = this.state.source;
    console.log('-------render: url', JSON.stringify(source));
    // const source = require('./test.pdf');  // ios only
    // const source = {uri:'bundle-assets://test.pdf'};

    // const source = {uri:'file:///sdcard/test.pdf'};
    // const source = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};

    return (
      <View style={styles.container}>
        <View style = {styles.header}>
          <View style ={{ height: 50, width: 100, marginLeft: 20, marginTop: 10 } }>
            <Button
              title="LoadFile"
              onPress={this.loadFile.bind(this)}/>
          </View>
          <View style ={{ height: 50, width: 100, marginLeft: 50, marginTop: 10 } }>
            <Button
              title="RequireFile"
              onPress={this.loadLocalFile.bind(this)}/>
          </View>
        </View>
        <PdfViewer
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`number of pages: ${ numberOfPages }`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`current page: ${ page }`);
          }}
          onError={(error) => {
            console.log(error);
          }}
          onPressLink={(uri) => {
            console.log(`Link presse: ${ uri }`);
          }}
          style={styles.pdf}/>
      </View>
    );
  }

  loadLocalFile() {
    let source = require("../../Resources/test.pdf");
    
    this.setState({ source: source });
  }

  loadFile() {
    if (Host.isIOS) {
      Host.ui.openIOSDocumentFileChoosePage().then((res) => {
        console.log('----------queryFile:', JSON.stringify(res));
        if (res.data && res.data.length > 0) {
          let pdfDic = res.data[0];
          console.log("----------loadFile:", JSON.stringify(pdfDic));
          if (pdfDic && pdfDic['ext'] == 'pdf' && pdfDic['path']) {
            let path = pdfDic['path'];
            let sourcePath = `${ Host.file.storageBasePath }/${ path }`;
            let source = { uri: sourcePath };
            this.setState({ source: source });
          } else {
            alert('选择的文件不存在或不是pdf格式，请重新选择文件');
          }
        }
      }).catch((err) => {
        alert(JSON.stringify(err));
      });
    } else {
      let params = {
        mimeTypes: ["application/pdf" // pdf
        ],
        pageSize: 2,
        pageNo: 0
      };
      Host.file.queryFile(params).then((res) => {
        console.log('----------queryFile:', JSON.stringify(res));
        if (res.data && res.data.length > 0) {
          let pdfFile = res.data[0];
          console.log("----------loadFile:", JSON.stringify(pdfFile));
          let source = { uri: pdfFile.url };
          this.setState({ source: source });
  
        }
      }).catch((err) => {
        alert(JSON.stringify(err));
      });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
    // marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  header: {
    flexDirection: 'row'
  }
});