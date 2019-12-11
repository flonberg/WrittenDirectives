export interface beamGroup {
    disabled?: boolean;
    name: string;
    beam: beam[];
  }
  export interface beam {
    id: number;
    value: string;
  }
export const beamGroups = [                                                   // parameters for the BeamType drop down. 
    {
      name: 'Photons',
      beam: [
        {id:1, value: '6Mv'},
        {id:2, value: '10Mv'},
        {id:3, value: '15Mv'},
        {id:3, value: '6_&_10Mv'},
        {id:3, value: '6_&_15Mv'},
      ]
    },
    {
      name: 'Protons',
      beam: [
        { id: 11, value: 'Protons_BS'},
        { id: 12, value: 'Protons_DS'},
        { id: 13, value: 'Protons_Star'},
        { id: 13, value: 'Protons_EYE'},
      ]
    },
    {
      name: 'Electrons',
      disabled: false,
      beam: [
        { id: 21, value: 'Electrons'},
      ]
    },
  ];