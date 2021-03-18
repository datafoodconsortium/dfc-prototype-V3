// const mongo_client = require('./mongo_client');
// const mongoose = require('mongoose');
// const importModel = require('../ORM/importModel');
const request = require('request');
const CatalogItem_Supply_Offer = require('./../service/catalogItem_supply_offer.js');
const Entreprise = require('./../service/entreprise.js');


module.exports = function(router) {
  // this.config = require('./../../configuration.js');
  // Get workspaces
  let catalogItem_supply_offer = new CatalogItem_Supply_Offer();
  router.post('/catalog/clean', async (req, res, next) => {
    if (req.user == undefined) {
      next(new Error('user not defined'))
    } else {
      let out = await catalogItem_supply_offer.cleanImport(req.user);
      res.json(out)
    }
  })

  router.get('/catalog/import', async (req, res, next) => {
    if (req.user == undefined) {
      next(new Error('user not defined'))
    } else {
      let out = await catalogItem_supply_offer.getAllImport(req.user);
      res.json(out)
    }
  })
  router.post('/catalog/import/:idImport(*)/convert/:idReconciled(*)?', async (req, res, next) => {
    // console.log('API',req.params);
    let idImport = req.params.idImport;
    let idReconciled = req.params.idReconciled;
    if (req.user == undefined) {
      next(new Error('user not defined'))
    } else {
      let out = await supplyAndImport.convertImportIdToSupplyId(idImport, idSupply, req.user);
      res.json(out)
    }

  })

  router.get('/catalog/import/:id(*)', async (req, res, next) => {
    let out = await supplyAndImport.getOneImport(req.params.id);
    res.json(out)
  })

  router.get('/catalog/reconciled', async (req, res, next) => {
    if (req.user == undefined) {
      next(new Error('user not defined'))
    } else {
      let out = await catalogItem_supply_offer.getAllItem(req.user);
      // let out ={};
      res.json(out)
    }

  })

  router.post('/catalog/reconciled', async (req, res, next) => {
    try {
      let out = await supplyAndImport.updateOneSupply(req.body);
      res.json(out);
    } catch (e) {
      next(e)
    }
  })

  router.get('/catalog/reconciled/:id', async (req, res, next) => {
    let out = await supplyAndImport.getOneSupply(req.params.id);
    res.json(out);
  })

  router.post('/catalog/importSource', async (req, res, next) => {
    let source = decodeURI(req.query.source);
    if (req.user == undefined) {
      next(new Error('user not defined'))
    } else {
      try {
        let out = await catalogItem_supply_offer.importSource(source, req.user);
        res.json(out);
      } catch (e) {
        res.statusCode=409;
        next(e);
      }
    }
  })

}