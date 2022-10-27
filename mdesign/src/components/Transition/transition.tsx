import React, { FC, ReactNode } from 'react';
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right';


type TransitionProps = CSSTransitionProps & { 
  animation?: AnimationName,
  wrapper ?: boolean
}

/** 过渡动画 */
const Transition:FC<TransitionProps> =(props)=>{
    const {children,classNames,animation,wrapper,...restProps}=props;
    return <CSSTransition
    classNames = {classNames ? classNames : animation}
      {...restProps}
    >
        {wrapper ? <div>{children as ReactNode}</div> : children}
    </CSSTransition>
}
//利用transition不会继承解决transition冲突问题
Transition.defaultProps={
    unmountOnExit:true,
    appear:true
}

export default Transition