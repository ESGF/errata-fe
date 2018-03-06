export ERRATA_FE_HOME="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $ERRATA_FE_HOME
webpack --config=./webpack.config.js --mode=production
