App = {
  web3Provider: null,
  contracts: {},
  web3: null,

  init: async function() {
    // Load pets.
    

    return await App.initWeb3();
  },

  initWeb3: async function() {
    // Modern dapp browsers...
    
    //App.web3 = new Web3('http://localhost:8545');
    App.web3 = new Web3("https://kovan.infura.io/v3/60dfe1a562ab4e2baafe21f153d1ea3e"); //there goes my API
    $(document).on('click', '.btn-buy', App.handleBuy);
    return App.initContract();
  },

  handleBuy: function(event) {
    event.preventDefault();
    var id = parseInt($(event.target).data('id'));
    console.log(id);
  },

  initContract: function() {
    const puppyInstance = new App.web3.eth.Contract(nftABI, "0xDE127309ebEd45f6187683cb16AA611093Ca90E0");
    (async function() {
      const saleList = await puppyInstance.methods.getPuppysForSale().call();
      var puppyForSale = $('#puppyForSale');

      for (var i = 0; i < saleList.length; i++) {
        const puppyDetail = await puppyInstance.methods.getPuppyDetails(saleList[i]).call();
        var puppyTemplate = $('#puppyTemplate');
        
        puppyTemplate.find('.panel-title').text("id: " + saleList[i]);
        puppyTemplate.find('.pet-breed').text(puppyDetail.purchasePrice / Math.pow(10, 18) + " eth");
        puppyTemplate.find('.pet-age').text(puppyDetail.sellingPrice / Math.pow(10, 18) + " eth");
        puppyTemplate.find('.btn-buy').attr('data-id', saleList[i]);
        puppyForSale.append(puppyTemplate.html());
      }
    }());
  },
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
