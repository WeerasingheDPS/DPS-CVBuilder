import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    personalData:{
      name:null,
      jobTitle:null,
      phone:null,
      email:null,
      address:null,
      profilePicture:null,
      twitter:null,
      linkedIn:null,
      github:null,
      website:null,
      discord:null,
      linkedInLabel:null,
      twitterLabel:null,
      githubLabel:null,
      websiteLabel:null,
      discordLabel:null
    },

    mainContents:[],

    orderId:10,

    activeContent:{},

    hasCv:false
}

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.personalData.name = action.payload;
    },
    setTitle: (state, action) => {
      state.personalData.jobTitle = action.payload;
    },
    setPhone: (state, action) => {
      state.personalData.phone = action.payload;
    },
    setEmail: (state, action) => {
      state.personalData.email = action.payload;
    },
    setAddress: (state, action) => {
      state.personalData.address = action.payload;
    },
    setProfilePicture: (state, action) => {
      state.personalData.profilePicture = action.payload;
    },
    setTwitter: (state, action) => {
      state.personalData.twitter = action.payload;
    },
    setLinkedIn: (state, action) => {
      state.personalData.linkedIn = action.payload;
    },
    setGitHub: (state, action) => {
      state.personalData.github = action.payload;
    },
    setWebsite: (state, action) => {
      state.personalData.website = action.payload;
    },
    setDiscode: (state, action) => {
      state.personalData.discord = action.payload;
    },
    setTwitterLabel: (state, action) => {
      state.personalData.twitterLabel = action.payload;
    },
    setLinkedInLabel: (state, action) => {
      state.personalData.linkedInLabel = action.payload;
    },
    setGitHubLabel: (state, action) => {
      state.personalData.githubLabel = action.payload;
    },
    setWebsiteLabel: (state, action) => {
      state.personalData.websiteLabel = action.payload;
    },
    setDiscodeLabel: (state, action) => {
      state.personalData.discordLabel = action.payload;
    },

    incOrderId: (state) => {
      state.orderId = state.orderId + 1;
    },

    decOrderId: (state) => {
      state.orderId = state.orderId - 1;
    },

    setActiveContent: (state, action) => {
      state.activeContent = action.payload;
    },

    addMainContent: (state, action) => {
      state.mainContents.push(action.payload);
     // state.mainContents = [...state.mainContents, action.payload];
    },

    addSubContent: (state, action) => {
      const { index, data } = action.payload;

      // Check if the index is valid
      if (index >= 0 && index < state.mainContents.length) {
        // Push the new subcontent to the specified main content
        state.mainContents[index].subContents.push(data);
      }
    },

    setPersonalData: (state,action) => {
      state.personalData = action.payload;
    },

    setMainContents: (state, action) => {
        state.mainContents = action.payload;
    },

    setHasCv: (state) => {
        state.hasCv = true;
    },

    settitleForList: (state = initialState, action) => {
      console.log("Dula-00")
      //console.log(action);
      const {index, key, data} = action.payload;
      return {
        ...state,
        mainContents: state.mainContents.map((outerItem) => {
          if (outerItem.contentId === index) {
            console.log("Dula-01")
            return {
              ...outerItem,
              subContents: outerItem.subContents.map((innerItem) => {
                if (innerItem.subContentId === key) {
                  console.log("Dula-02")
                  return {
                    ...innerItem,
                    title: data,
                  };
                }
                return innerItem;
              }),
            };
          }
          return outerItem;
        }),
      };
    
  },

    
}

    
});

export const { 
  setDiscodeLabel,
  setWebsiteLabel,
  setGitHubLabel,
  setLinkedInLabel,
  setTwitterLabel,
  setDiscode,
  setWebsite,
  setGitHub,
  setLinkedIn,
  setTwitter,
  setProfilePicture,
  setAddress,
  setEmail,
  setPhone,
  setTitle,
  setName,
  incOrderId,
  decOrderId,
  addMainContent,
  addSubContent,
  setPersonalData,
  setMainContents,
  setHasCv,
  setActiveContent ,
  settitleForList
} = resumeSlice.actions;

export default resumeSlice.reducer;
