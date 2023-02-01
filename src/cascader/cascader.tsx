// import "../css/index.scss";
import { Input } from '@future/input/dist/react';
import Picker from '@future/picker/dist/react';
import classNames from 'classnames';
import React, { createRef, ReactChild, ReactNode, RefObject } from 'react';
import { throttle } from 'throttle-debounce';

export interface Option {
  value: string;
  label?: ReactNode;
  parent?: string;
  disabled?: boolean;
}

interface OptionTreeNode extends Option {
  children?: OptionTreeNode[];
}

type OptionTreeNodeMap = { [key in string]: OptionTreeNode };

export interface CascaderProps {
  className?: string;
  value?: string[];
  options: Option[];

  placeholder?: string;
  expandTrigger?: 'click' | 'hover';

  searchable?: boolean;
  changeOnSelect?: boolean;

  pickedRender?: (pickedOptions: Option[]) => ReactNode;
  searchFilter?: (result: Option) => boolean;

  onChange?: (value: string[]) => boolean | void;
}

interface CascaderState {
  shadowValue: string[];

  dropdownVisible: boolean;
  rootOptionValues: string[];
  optionTreeNodeMap: OptionTreeNodeMap;

  searchInputValue: string;
  searchResults: OptionTreeNode[];
}

export class Cascader extends React.Component<CascaderProps, CascaderState> {
  static defaultProps = {
    searchable: true,
  };

  pickerRef: RefObject<HTMLDivElement>;

  constructor(props: CascaderProps) {
    super(props);

    const { rootOptionValues, optionTreeNodeMap } = this.getTreeData(
      props.options,
    );

    this.state = {
      dropdownVisible: false,
      shadowValue: props.value || [],
      rootOptionValues,
      optionTreeNodeMap,
      searchInputValue: '',
      searchResults: [],
    };

    this.pickerRef = createRef();
  }

  getTreeData(options = this.props.options) {
    const optionNodes = options as OptionTreeNode[];

    const optionTreeNodeMap: OptionTreeNodeMap = {};
    const rootOptionValues = [];

    for (const option of options) {
      optionTreeNodeMap[option.value] = { ...option };

      if (!option.parent) {
        rootOptionValues.push(option.value);
      }
    }

    for (const option of optionNodes) {
      if (option.parent) {
        const parentOption = optionTreeNodeMap[option.parent];

        if (!parentOption.children) {
          parentOption.children = [];
        }

        parentOption.children.push(optionTreeNodeMap[option.value]);
      }
    }

    return {
      rootOptionValues,
      optionTreeNodeMap,
    };
  }

  listPickedOptions() {
    const { value, options } = this.props;

    return value && value.length > 0
      ? options.filter((option) => value.includes(option.value))
      : [];
  }

  getLevelChildren() {
    const { optionTreeNodeMap, shadowValue } = this.state;

    const value = shadowValue;

    return value
      ? value.map((val) => optionTreeNodeMap[val].children).filter(Boolean)
      : [];
  }

  getNodeLevel(node: OptionTreeNode): number {
    const { optionTreeNodeMap } = this.state;

    const parent = node.parent;

    return parent && optionTreeNodeMap[parent]
      ? 1 + this.getNodeLevel(optionTreeNodeMap[parent])
      : 0;
  }

  getNodeFamily(node: OptionTreeNode): OptionTreeNode[] {
    const { optionTreeNodeMap } = this.state;

    const family: OptionTreeNode[] = [node];

    const parent = node.parent;

    return parent && optionTreeNodeMap[parent]
      ? this.getNodeFamily(optionTreeNodeMap[parent]).concat(family)
      : family;
  }

  handleNodeSelect = (node: OptionTreeNode, trigger: 'click' | 'hover') => {
    const newValue = this.getNodeFamily(node).map((node) => node.value);

    this.setState({
      shadowValue: newValue,
    });

    const { changeOnSelect } = this.props;

    if (trigger === 'click' && (changeOnSelect || !node.children)) {
      const result = this.props.onChange?.(newValue);
      this.setState({
        searchInputValue: '',
        searchResults: [],
        dropdownVisible: result === undefined ? !!node.children : !result,
      });
    }
  };

  handleSearch = throttle(500, (searchInputValue: string) => {
    let results: OptionTreeNode[] = [];

    if (searchInputValue) {
      const { options, searchFilter } = this.props;

      results = options.filter((option) =>
        typeof option.label === 'string'
          ? option.label.toLowerCase().includes(searchInputValue.toLowerCase())
          : option.value.toLowerCase().includes(searchInputValue.toLowerCase()),
      );

      if (searchFilter) {
        results = results.filter(searchFilter);
      }

      results = results.map((option) => {
        const node = { ...this.state.optionTreeNodeMap[option.value] };

        if (searchFilter) {
          node.children = undefined;
        }

        return node;
      });

      if (!searchFilter) {
        results = results.filter((node) => !node.children);
      }
    }

    this.setState({
      searchResults: results,
    });
  });

  handleDropdownVisibleChange(visible: boolean) {
    this.setState({
      dropdownVisible: visible,
    });

    if (visible) {
      const { value = [] } = this.props;

      this.setState(
        {
          shadowValue: [...value],
        },
        () => {
          this.state.shadowValue.forEach((val) => {
            positionSelected(
              this.pickerRef.current as HTMLDivElement,
              `.J-item-${val}`,
            );
          });
        },
      );
    }
  }

  defaultRender(pickedOptions: Option[]) {
    return pickedOptions.map((option) => option.label).join('/');
  }

  render(): React.ReactNode {
    const {
      className,
      value,
      placeholder,
      searchable,
      pickedRender = this.defaultRender,
    } = this.props;

    const {
      dropdownVisible,
      shadowValue,
      rootOptionValues,
      optionTreeNodeMap,
      searchInputValue,
      searchResults,
    } = this.state;

    const childrenCollection = this.getLevelChildren();

    const width = this.pickerRef.current?.offsetWidth || '100%';

    const widthStyle = { width };

    const hasValue = value && value.length > 0;
    const pickedOptions = this.listPickedOptions();

    return (
      <Picker
        namespace="ft-cascader"
        className={className}
        dropdownVisible={dropdownVisible}
        ref={this.pickerRef}
        value={pickedRender(pickedOptions) as ReactChild}
        placeholder={placeholder}
        title={hasValue ? this.defaultRender(pickedOptions) : undefined}
        onClick={() => {
          this.handleDropdownVisibleChange(!this.state.dropdownVisible);
        }}
        onBlur={() => {
          this.handleDropdownVisibleChange(false);
        }}
        onClear={() => {
          this.props.onChange?.([]);
        }}
        clear={value && value.length > 0}
      >
        <div className="ft-cascader-menus" style={widthStyle}>
          {searchable && (
            <>
              <div className="ft-cascader-search">
                <Input
                  placeholder="搜索目录名称"
                  value={searchInputValue}
                  onChange={(e) => {
                    const searchInputValue = e.target.value;
                    this.setState({ searchInputValue });
                    this.handleSearch(searchInputValue);
                  }}
                />
                <i className="ft-icon icon-search" />
              </div>
              {searchResults.length > 0
                ? this.renderMenu(searchResults)
                : searchInputValue && (
                    <div className="ft-cascader-empty">暂无相关结果</div>
                  )}
            </>
          )}
          {(!searchable || !searchInputValue) &&
            this.renderMenu(
              rootOptionValues.map((val) => optionTreeNodeMap[val]),
            )}
        </div>
        {(!searchable || !searchInputValue) &&
          childrenCollection.map((children, i) => (
            <div
              className="ft-cascader-menus"
              style={widthStyle}
              key={shadowValue[i]}
            >
              {this.renderMenu(children)}
            </div>
          ))}
      </Picker>
    );
  }

  renderMenu(nodes?: OptionTreeNode[]) {
    const { expandTrigger = 'click' } = this.props;
    const { shadowValue } = this.state;

    const value = shadowValue;

    return (
      nodes &&
      nodes.length > 0 && (
        <div className="ft-cascader-menu">
          {nodes.map((node) => (
            <div
              className={classNames(
                `ft-cascader-menu-item J-item-${node.value}`,
                value && value.includes(node.value) && 'is-selected',
              )}
              onMouseEnter={() => {
                expandTrigger === 'hover' &&
                  this.handleNodeSelect(node, expandTrigger);
              }}
              onClick={() => {
                this.handleNodeSelect(node, 'click');
              }}
              key={node.value}
            >
              <div className="ft-cascader-menu-item-content">{node.label}</div>
              {node.children && node.children.length > 0 && (
                <div className="ft-cascader-menu-item-expand-icon">
                  <i className="ft-icon icon-right" />
                </div>
              )}
            </div>
          ))}
        </div>
      )
    );
  }

  componentDidMount(): void {}

  componentDidUpdate(
    prevProps: Readonly<CascaderProps>,
    prevState: Readonly<CascaderState>,
    snapshot?: any,
  ) {}
}

const positionSelected = (
  container: HTMLElement,
  targetOrSelector: HTMLElement | string,
) => {
  const target =
    typeof targetOrSelector === 'string'
      ? container.querySelector(targetOrSelector)
      : targetOrSelector;

  if (target) {
    target.scrollIntoView({
      block: 'center',
    });
  }
};
