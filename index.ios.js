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
    this.exchangeRate = 6.0
    this.state = {
      cost: 0,
      shipping: 0,
      taxRate: 0,
      subTotal: 0,
      listingPrice: 0,
      profit: 0,
      tax: 0,
      exchangeRate: this.exchangeRate,
    }
  }

  calculateBalances() {
    var subTotal = this.state.cost * (1.0 + this.state.taxRate / 100.0) + this.state.shipping
    this.setState({
      tax: this.state.taxRate / 100.0 * this.state.cost,
      subTotal: subTotal,
      profit: this.state.listingPrice - subTotal,
      rmbCost: subTotal * (this.state.exchangeRate || this.exchangeRate)
    })
  }

  renderRmbAmount(num) {
    return this.renderRoundedNumber(num * this.state.exchangeRate)
  }

  renderRoundedNumber(num) {
    return Math.round(num * 100) / 100
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
          <TextInputWithLabel label="Item cost" width={75}>
            <TextInput
              style={styles.textfield}
              placeholder=''
              autoCorrect={false}
              keyboardType='decimal-pad'
              onChangeText={text => this.setState({cost: parseFloat(text || 0)},this.calculateBalances)} />
            <Text style={{textAlign: 'center'}}>${this.renderRoundedNumber(this.state.cost)}</Text>
            <Text style={{textAlign: 'center'}}>¥{this.renderRmbAmount(this.state.cost)}</Text>
          </TextInputWithLabel>
          <TextInputWithLabel label="Tax Rate %" width={75}>
            <TextInput
              style={styles.textfield}
              placeholder=''
              autoCorrect={false}
              keyboardType='decimal-pad'
              onChangeText={text => this.setState({taxRate: parseFloat(text || 0)},this.calculateBalances)} />
            <Text style={{textAlign: 'center'}}>${this.renderRoundedNumber(this.state.tax)}</Text>
            <Text style={{textAlign: 'center'}}>¥{this.renderRmbAmount(this.state.tax)}</Text>
          </TextInputWithLabel>
          <TextInputWithLabel label="Shipping" width={75}>
            <TextInput
              style={styles.textfield}
              placeholder=''
              autoCorrect={false}
              keyboardType='decimal-pad'
              onChangeText={text => this.setState({shipping: parseFloat(text || 0)},this.calculateBalances)} />
            <Text style={{textAlign: 'center'}}>${this.renderRoundedNumber(this.state.shipping)}</Text>
            <Text style={{textAlign: 'center'}}>¥{this.renderRmbAmount(this.state.shipping)}</Text>
          </TextInputWithLabel>
          <TextInputWithLabel label="List Price" width={75}>
            <TextInput
              style={styles.textfield}
              placeholder=''
              autoCorrect={false}
              keyboardType='decimal-pad'
              onChangeText={text => this.setState({listingPrice: parseFloat(text || 0)},this.calculateBalances)} />
            <Text style={{textAlign: 'center'}}>${this.renderRoundedNumber(this.state.listingPrice)}</Text>
            <Text style={{textAlign: 'center'}}>¥{this.renderRmbAmount(this.state.listingPrice)}</Text>
          </TextInputWithLabel>
        </View>
        <View style={styles.totalView}>
          <View style={styles.tallyView}>
            <Text style={{fontWeight: 'bold'}}>
              Total Cost
            </Text>
            <Text style={{fontSize: 24}}>${this.renderRoundedNumber(this.state.subTotal)}</Text>
            <Text>
              ¥ {this.renderRoundedNumber((this.state.rmbCost) || 0)}
            </Text>
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
        <View style={{flex: 1, flexDirection: "row", alignItems: 'center', paddingLeft: 10}}>
          <Text>RMB/US rate</Text>
            <TextInput
              style={{borderColor: '#eeeeee', borderWidth: 1, padding: 10, marginLeft: 5, width: 75, height: 36}}
              placeholder='6'
              autoCorrect={false}
              keyboardType='decimal-pad'
              onChangeText={text => this.setState({exchangeRate: parseFloat(text || this.exchangeRate)},this.calculateBalances)} />
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
    paddingBottom: 0,
    margin: 10,
    marginBottom: 0,
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
