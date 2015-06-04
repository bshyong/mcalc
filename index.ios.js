// 2015 Ben Shyong
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
} = React;


class TextInputWithLabel extends React.Component {
  render() {
    return (
      <View style={{width: this.props.width}}>
        <Text>{this.props.label}</Text>
        {this.props.children}
      </View>
    )
  }
}

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cost: 0,
      shipping: 0,
      taxRate: 0,
      subTotal: 0,
      listingPrice: 0,
      profit: 0,
      tax: 0
    }
  }

  calculateBalances() {
    var subTotal = this.state.cost * (1.0 + this.state.taxRate / 100.0) + this.state.shipping
    this.setState({
      tax: this.state.taxRate / 100.0 * this.state.cost,
      subTotal: subTotal,
      profit: this.state.listingPrice - subTotal
    })
  }

  renderRoundedNumber(num) {
    return Math.round(num * 100) / 100
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10}}>
          <TextInputWithLabel label="Item cost" width={75}>
            <TextInput
              style={styles.textfield}
              placeholder=''
              autoCorrect={false}
              keyboardType='decimal-pad'
              onChangeText={text => this.setState({cost: parseFloat(text || 0)},this.calculateBalances)} />
            <Text style={{textAlign: 'center'}}>${this.renderRoundedNumber(this.state.cost)}</Text>
          </TextInputWithLabel>
          <TextInputWithLabel label="Tax Rate %" width={75}>
            <TextInput
              style={styles.textfield}
              placeholder=''
              autoCorrect={false}
              keyboardType='decimal-pad'
              onChangeText={text => this.setState({taxRate: parseFloat(text || 0)},this.calculateBalances)} />
            <Text style={{textAlign: 'center'}}>${this.renderRoundedNumber(this.state.tax)}</Text>
          </TextInputWithLabel>
          <TextInputWithLabel label="Shipping" width={75}>
            <TextInput
              style={styles.textfield}
              placeholder=''
              autoCorrect={false}
              keyboardType='decimal-pad'
              onChangeText={text => this.setState({shipping: parseFloat(text || 0)},this.calculateBalances)} />
            <Text style={{textAlign: 'center'}}>${this.renderRoundedNumber(this.state.shipping)}</Text>
          </TextInputWithLabel>
          <TextInputWithLabel label="List Price" width={75}>
            <TextInput
              style={styles.textfield}
              placeholder=''
              autoCorrect={false}
              keyboardType='decimal-pad'
              onChangeText={text => this.setState({listingPrice: parseFloat(text || 0)},this.calculateBalances)} />
            <Text style={{textAlign: 'center'}}>${this.renderRoundedNumber(this.state.listingPrice)}</Text>
          </TextInputWithLabel>
        </View>
        <View style={styles.totalView}>
          <View style={styles.tallyView}>
            <Text style={{fontWeight: 'bold'}}>
              Total Cost
            </Text>
            <Text style={{fontSize: 24}}>${this.renderRoundedNumber(this.state.subTotal)}</Text>
          </View>
          <View style={styles.tallyView}>
            <Text style={{fontWeight: 'bold'}}>
              Profit
            </Text>
            <Text style={{fontSize: 24, textAlign: 'right'}}>${this.renderRoundedNumber(this.state.profit)}</Text>
            <Text style={{textAlign: 'right'}}>
              {this.renderRoundedNumber((this.state.profit * 100.0 / this.state.subTotal) || 0)}%
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  textfield: {
    height: 36,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#eeeeee',
    padding: 5,
  },
  totalView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    borderTopColor: '#999',
    borderTopWidth: 2,
    padding: 10,
    margin: 10,
    marginBottom: 20,
  },
  tallyView: {
    textAlign: 'left',
    padding: 5
  },
  container: {
    marginTop: 65,
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  navBar: {
    flex: 1,
    justifyContent: 'center',
    color: '#333333',
  },
});

class mCalc extends React.Component {
  render() {
    return (
      <React.NavigatorIOS
        style={styles.navBar}
        initialRoute={{
          title: 'm',
          component: Index,
        }} />
    )
  }
}


AppRegistry.registerComponent('mcalc', () => mCalc);
