export default class Component {
  $target;

  props;

  state;

  constructor($target, props) {
    this.$target = $target;
    this.initProps(props);
    this.initState();
    this.render();
    this.setEvent();
    this.componentDidMount();
  }

  initProps(props) {
    this.props = props;
  }

  // 초기 상태 설정
  initState() {
    this.state = {};
  }

  // 렌더링
  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  // innerHtml에 삽입할 html tags return
  template() { return ''; }

  // 자식 컴포넌트들 마운트
  mounted() {}

  // 이벤트 등록
  setEvent() {}

  // 이벤트 추가(버블링)
  addEvent(eventType, selector, callback) {
    const targetList = [...this.$target.querySelectorAll(selector)];

    const getTarget = (dom) => {
      if (targetList.includes(dom)) return dom;

      const target = dom.closest(selector);

      if (target) return target;
      return false;
    };

    this.$target.addEventListener(eventType, (event) => {
      const target = getTarget(event.target);

      if (!target) return false;
      callback(event, target);
      return true;
    });
  }

  componentDidMount() {}

  // updateComponent($nextTarget, nextProps) {
  //   const shouldUpdate = this.shouldComponentUpdate(nextProps);

  //   if (shouldUpdate) {
  //     this.updateProps(nextProps);
  //     this.$target = $nextTarget;
  //     this.render();
  //   } else {
  //     $nextTarget.innerHTML = this.$target.innerHTML;
  //     this.$target = $nextTarget;
  //   }

  //   this.setEvent();
  //   this.compoenntDidUpdate();
  // }

  shouldComponentUpdate(nextProps) {
    return !!Object.keys(nextProps).filter((key) => {
      return !this.props[key] || nextProps[key] !== this.props[key]

    });
  }

  updateProps(nextProps) {
    this.props = { ...nextProps };
  }

  compoenntDidUpdate() {}

  // 상태 변경
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
    this.compoenntDidUpdate();
  }
}
