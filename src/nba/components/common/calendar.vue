<template>
  <div class="vux-calendar">
    <div @click="onClick"><slot/></div>

    <div v-transfer-dom="true">
      <popup
        v-model="show"
        @on-show="onPopupShow"
        @on-hide="onPopupHide">

        <popup-header
          v-if="shouldConfirm"
          @on-click-left="onClickLeft"
          @on-click-right="onClickRight"
          :title="popupHeaderTitle"
          left-text="Cancel"
          right-text="Confirm"></popup-header>

        <slot name="popup-before-calendar"></slot>

        <inline-calendar
          v-model="currentValue"
          @on-change="onCalendarValueChange"
          @on-select-single-date="onSelectSingleDate"
          :render-month="renderMonth"
          :start-date="startDate"
          :end-date="endDate"
          :show-last-month="showLastMonth"
          :show-next-month="showNextMonth"
          :highlight-weekend="highlightWeekend"
          :return-six-rows="returnSixRows"
          :hide-header="hideHeader"
          :hide-week-list="hideWeekList"
          :replace-text-list="replaceTextList"
          :weeks-list="weeksList"
          :render-function="renderFunction"
          :render-on-value-change="renderOnValueChange"
          :disable-past="disablePast"
          :disable-future="disableFuture"
          :marks="marks"
          :disable-weekend="disableWeekend"
          :disable-date-function="disableDateFunction"
        ></inline-calendar>

      </popup>
    </div>
  </div>
</template>

<script>
import { TransferDom, InlineCalendar, Popup, PopupHeader } from 'vux'
import format from '../../utils/format'
const getType = (value) => {
  if (typeof value === 'string') {
    return 'string'
  }
  if (Object.prototype.toString.call(value) === '[object Array]') {
    return 'array'
  }
}
const pure = function (value) {
  const type = getType(value)
  if (type === 'string') {
    return value
  } else if (type === 'array') {
    return JSON.parse(JSON.stringify(value))
  }
}
const Props = {
  title: {
    type: String,
    required: true
  },
  placeholder: String,
  showPopupHeader: Boolean,
  popupHeaderTitle: String,
  readonly: Boolean,
  value: {
    type: [String, Array],
    default: ''
  },
  renderMonth: {
    type: Array, // [2018, 8]
    default () {
      return [null, null]
    }
  },
  startDate: {
    type: String
  },
  endDate: {
    type: String
  },
  showLastMonth: {
    type: Boolean,
    default: true
  },
  showNextMonth: {
    type: Boolean,
    default: true
  },
  highlightWeekend: {
    type: Boolean,
    default: false
  },
  returnSixRows: {
    type: Boolean,
    default: true
  },
  hideHeader: {
    type: Boolean,
    default: false
  },
  hideWeekList: {
    type: Boolean,
    default: false
  },
  replaceTextList: {
    type: Object,
    default () {
      return {}
    }
  },
  weeksList: {
    type: Array,
    validator (val) {
      if (val) {
        return val.length === 7 || val.length === 0
      }
      return true
    }
  },
  renderFunction: {
    type: Function,
    default: () => ''
  },
  renderOnValueChange: {
    type: Boolean,
    default: true
  },
  disablePast: {
    type: Boolean,
    default: false
  },
  disableFuture: {
    type: Boolean,
    default: false
  },
  disableWeekend: {
    type: Boolean,
    default: false
  },
  disableDateFunction: Function,
  marks: {
    type: Array,
    default () {
      return []
    }
  }
}
export default {
  name: 'calendar',
  directives: {
    TransferDom
  },
  components: {
    InlineCalendar,
    Popup,
    PopupHeader
  },
  computed: {
    shouldConfirm () {
      return this.showPopupHeader || this.getType(this.value) === 'array'
    }
  },
  created () {
    if (this.value === 'TODAY') {
      this.currentValue = format(new Date(), 'YYYY-MM-DD')
      this.$emit('input', this.currentValue)
    } else {
      if (this.getType(this.value) === 'string') {
        this.currentValue = this.value
      } else {
        this.currentValue = pure(this.value)
      }
    }
  },
  props: Props,
  methods: {
    onPopupShow () {
      this.$emit('on-show')
    },
    onPopupHide () {
      this.$emit('on-hide')
      // reset value to show value
      this.currentValue = pure(this.value)
    },
    getType,
    onClickLeft () {
      this.show = false
      this.currentValue = pure(this.value)
    },
    onClickRight () {
      this.show = false
      const value = pure(this.currentValue)
      this.$emit('input', value)
    },
    onClick () {
      if (!this.readonly) {
        this.show = true
      }
    },
    onCalendarValueChange (val) {
      if (!this.shouldConfirm) {
        this.show = false
        this.$emit('input', pure(val))
      }
    },
    onSelectSingleDate () {
      if (!this.shouldConfirm) {
        this.show = false
      }
    }
  },
  watch: {
    value (newVal, oldVal) {
      if (this.getType(this.value) === 'string') {
        this.currentValue = newVal
        this.$emit('on-change', newVal)
      } else {
        if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
          this.$emit('on-change', pure(newVal))
        }
        this.currentValue = pure(newVal)
      }
    }
  },
  data () {
    return {
      show: false,
      currentValue: ''
    }
  }
}
</script>
