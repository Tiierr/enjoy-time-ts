import React, {useState} from 'react';
import { TimeType } from '../time';

interface SettingProps {
  action: Callback,
  currentTab: TimeType
}

interface Callback {
  (TimeType): void
}

function Setting({action, currentTab}: SettingProps) {
  const [show, setShow] = useState<boolean>(true);

  interface SideBarStyle {
    right: string,
    bottom: string
  }

  function getSideBarStyle(): SideBarStyle{
    if (show){
      return {
        right: '120vh',
        bottom: '-100vh'
      }
    } else {
      return {
        right: 'calc(100vw - 20vh)',
        bottom: '-42vh'
      }
    } 
  }

  const fold = () => {
      setShow(!show)
    }

  return (
      <>
        <div className="SideBar" onClick={fold} style={getSideBarStyle()}>
          <SideBar type={TimeType.Default} desc="全" action={action} tab={currentTab}/>
          <SideBar type={TimeType.Year} desc="年" action={action} tab={currentTab}/>
          <SideBar type={TimeType.Month} desc="月" action={action} tab={currentTab}/>
          <SideBar type={TimeType.Day} desc="日" action={action} tab={currentTab}/>
          <SideBar type={TimeType.Hour} desc="时" action={action} tab={currentTab}/>
          <SideBar type={TimeType.Minute} desc="分" action={action} tab={currentTab}/>
        </div>
        { show &&
          <div className="Settings" onClick={fold}>
          ⏱
          </div> 
        }
      </>
  );
}


interface SideBarProps {
  type: string,
  desc: string,
  action: Callback,
  tab: TimeType
}


function SideBar({type, desc, action, tab}: SideBarProps) {

  function getStyle() {
    if (type === tab){
      return {
        fontSize: "1.70vh",
        fontWeight: 600
      }
    } else {
      return {}
    }
  }

  
  function setTab() {
    action(type);
  }
  return (
    <>
      <div onClick={setTab} className={type} style={getStyle()}>
        {desc}
      </div>
    </>
  )
}

export default Setting;

