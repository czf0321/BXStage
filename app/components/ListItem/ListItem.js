/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Text, View, Dimensions, Image,
} from "react-native";

/** 全局样式的引用 */
import {Layout} from "../../styles/layout";
import {Size} from '../../styles/size';

/** 第三方依赖库的引用 */
import PropTypes from 'prop-types';

/** 自定义组建的引用 */
import CTouchableWithoutFeedback from '../../components/CTouchableWithoutFeedback';

/** 工具类的引用 */

/** 常量声明 */
const {width, height} = Dimensions.get('window');//屏幕宽度
const RIGHT_ICON = require('../../images/common/common_img_arrow.png');

export default class ListItem extends Component {

  static propTypes = {
    isDot: PropTypes.bool, // 红点提示
    wrapperStyle: PropTypes.object, // 样式
    leftText: PropTypes.string, // 左边文案
    rightText: PropTypes.string, // 右边文案
    leftIconType: PropTypes.string, // icon 标识
    isShowUserImg: PropTypes.bool, // 是否显示用户头像
    isShowRightIcon: PropTypes.bool, // 是否显示右边icon
    hasBottomLine: PropTypes.bool, // 是否有底部线
    specialIconType: PropTypes.string, // 一些特殊用途的logo
  }

  static defaultProps = {
    isDot: false,
    wrapperStyle: {
      height: 50,
      marginTop: 0,
    },
    leftIconType: '',
    leftText: '',
    rightText: '',
    isShowUserImg: false,
    isShowRightIcon: true,
    hasBottomLine: false,
    specialIconType: '',
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  componentWillReceiveProps(nextProps, nextState) {
  }

  shouldComponentUpdate(nextProps) {
    return true
  }

  _getLeftIconPath(type) {
    let actions = new Map([
      ['MIB', () => require('../../images/me/me_img_borrowing.png')],
      ['MIT', () => require('../../images/me/me_img_transaction.png')],
      ['MIQ', () => require('../../images/me/me_img_qa.png')],
      ['MIC', () => require('../../images/me/me_img_customer.png')],
      ['MIF', () => require('../../images/me/me_img_feedback.png')],
      ['MIA', () => require('../../images/me/me_img_about.png')],
      ['MIS', () => require('../../images/me/me_img_setting.png')],
    ])
    return actions.get(type)()
  }

  _getSpecialIconPath(type) {
    let actions = new Map([
      ['ZSYH', () => require('../../images/me/accountInfo/bank_img_default.png')],
    ])
    return actions.get(type)()
  }

  _onPress=() => {
    this.props.handle instanceof Function && this.props.handle()
  }

  render() {
    const {isDot, leftText, rightText, leftIconType, isShowUserImg, isShowRightIcon, hasBottomLine, specialIconType, wrapperStyle} = this.props
    return (
      <CTouchableWithoutFeedback handle={this._onPress}>
        <View style={[styles.container, wrapperStyle]}>

          <View style={[styles.iconAndTextWrapper]}>
            {
              leftIconType ? <Image
                style={styles.leftIconStyle}
                source={this._getLeftIconPath(leftIconType)}
              /> : null
            }
            {
              leftText ? <Text style={styles.leftText}>
                {leftText}
              </Text> : null
            }
          </View>

          <View style={[styles.iconAndTextWrapper]}>
            {
              specialIconType ? <Image
                style={{width: 22, height: 22, borderRadius: 11,}}
                source={this._getSpecialIconPath(specialIconType)}
              /> : null
            }
            {
              rightText ? <Text style={styles.rightText}>
                {rightText}
              </Text> : null
            }
            {
              isDot ? <View style={[
                styles.circleStyle,
                Layout.layout.rcc
              ]}>
                <Text style={{fontSize: 12, color: Layout.color.white_bg}}>{'1'}</Text>
              </View> : null
            }
            {
              isShowUserImg ? <Image
                style={{width: 60, height: 60, borderRadius: 30,}}
                source={require('../../images/me/index_icon_bixia.png')}
              /> : null
            }
            {
              isShowRightIcon ? <Image
                style={styles.rightIconStyle}
                source={RIGHT_ICON}
              /> : null
            }

          </View>

          {
            hasBottomLine ? <View style={styles.borderBottomLine}>
            </View> : null
          }

        </View>
      </CTouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: width,
    ...Layout.layout.rsbc,
    position: 'relative',
    paddingHorizontal: 14,
  },
  iconAndTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  leftIconStyle: {
    marginRight: 12,
    width: 20,
    height: 20,
  },
  rightIconStyle: {
    width: 14,
    height: 14,
  },
  leftText: {
    color: Layout.color.wblack,
    fontSize: 16,
  },
  rightText: {
    color: Layout.color.wgray_main,
    fontSize: 14,
  },
  circleStyle: {
    width: 20,
    height: 20,
    backgroundColor: Layout.color.circle,
    borderRadius: 10,
    marginHorizontal: 10
  },
  borderBottomLine: {
    borderBottomWidth: Size.screen.pixel,
    borderBottomColor: Layout.color.gray_line,
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: width * 331 / 375
  }
});