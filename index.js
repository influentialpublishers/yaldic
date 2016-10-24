
const R                  = require('ramda')
const Bluebird           = require('bluebird')
const Mysql2             = require('mysql2')
const Request            = require('request')
const MysqlStore         = require('kuss/lib/mysql')
const SocialZombieClient = require('kuss/lib/socialzombie/client.js')
const RabbitMQ           = require('kuss/lib/rabbitmq/factory.js')
const Elasticsearch      = require('elasticsearch')
const Domain             = require('kvasir/loader.js')


const throwDoesNotExist = (dep) => { throw new Error(`${dep} does not exist`) }


const getDAO = (config) => MysqlStore(Mysql2.createPool(config))


const getSocialzombie = (config) =>
  SocialZombieClient(Request.defaults({ baseUrl : config.url }))


const getElasticsearch = (config) => new Elasticsearch.Client({
  host  : `${config.host}:${config.port}`
, defer : () => Bluebird.defer()
})


const get = R.cond([
  [ R.equals('DO')            , () => Domain ]
, [ R.equals('DAO')           , () => getDAO ]
, [ R.equals('rabbitmq')      , () => RabbitMQ ]
, [ R.equals('socialzombie')  , () => getSocialzombie ]
, [ R.equals('elasticsearch') , () => getElasticsearch ]
, [ R.T                       , throwDoesNotExist ]
])


module.exports = { get }
