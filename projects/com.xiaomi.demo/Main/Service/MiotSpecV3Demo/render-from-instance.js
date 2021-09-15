import React, { Fragment } from 'react';

import ContainerBasic from './components/ContainerBasic';
import ContainerController from './components/ContainerController';
import Configurable from './components/Configurable';
import { SubTypes, SubIidKeys } from './spec-helper';

export default function render(instance) {
  const defs = instance['data-type-defs'] || {};
  if (!instance || !instance.modules || !instance.modules.length) {
    return [];
  }
  return instance.modules.map((module) => {
    return (
      <ContainerBasic key={String(module.iid)} {...module} defs={defs}>
        {(module.services || []).map((service) => {
          return (
            <ContainerBasic key={String(service.iid)} {...service} miid={module.iid} siid={service.iid} defs={defs}>
              {SubTypes.map((key, index) => {
                return (service[key] || []).map((item) => {
                  return (
                    <Fragment key={String(item.iid)}>
                      <ContainerController
                        {...item}
                        miid={module.iid}
                        siid={service.iid}
                        eiid={SubIidKeys[index] === 'eiid' ? item.iid : ''}
                        aiid={SubIidKeys[index] === 'aiid' ? item.iid : ''}
                        piid={SubIidKeys[index] === 'piid' ? item.iid : ''}
                        defs={defs}
                      />
                      <Configurable
                        {...item}
                        miid={module.iid}
                        siid={service.iid}
                        eiid={SubIidKeys[index] === 'eiid' ? item.iid : ''}
                        aiid={SubIidKeys[index] === 'aiid' ? item.iid : ''}
                        piid={SubIidKeys[index] === 'piid' ? item.iid : ''}
                        defs={defs}
                      />
                    </Fragment>
                  );
                });
              })}
            </ContainerBasic>
          );
        })}
      </ContainerBasic>
    );
  });
}
