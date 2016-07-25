import React, { Component } from 'react'
import { View, TouchableHighlight, Text, ScrollView, Image, StyleSheet, TextInput } from 'react-native'
import { connect } from 'react-redux'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: false,
      ingredientsInput: '',
    }
  }

  searchPressed() {
    this.setState({searching: true});
    this.props.fetchRecipes(this.state.ingredientsInput).then(() => {
      this.setState({searching: false});
    });
  }

  // enhancer to take data [values from API call] from state/reducer & transform it into something thats easy to work with in our view---put each key into a hashmap
  // We will render this array in the ScrollView
  recipes() {
    return Object.keys(this.props.searchedRecipes).map( key => this.props.searchedRecipes[key] )
  }

  render() {
    console.log(this.recipes());
    const { recipeCount } = this.props
    return (
      <View style={styles.scene}>
        <View style={styles.searchSection}>

          <TextInput style={styles.searchInput}
            returnKeyType='search'
            placeholder='Ingredients (comma delimited)'
            onChangeText={ (ingredientsInput) => this.setState({ingredientsInput}) }
          />

          <TouchableHighlight onPress={() => this.searchPressed()} style={styles.searchButton}>
            <Text>Fetch Recipes</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.countRow}>
          <Text style={styles.countText}>Recipe Count = </Text>
          <Text style={styles.countNum}>{recipeCount}</Text>
        </View>

        <ScrollView style={styles.scrollSection}>
          {!this.state.searching && this.recipes().map((recipe) => {
            return (
              <View key={recipe.id}>
                <Image source={ { uri: recipe.image } } style={styles.resultImage} />
                <Text style={styles.resultText}>{recipe.title}</Text>
              </View>
            );
          })}
          { this.state.searching ? <Text>Searching...</Text> : null }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    marginTop: 20,
  },
  searchSection: {
    height: 30,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    padding: 5,
    flexDirection: 'row',
  },
  // align searchInput & searchButton on same row (thanks to above) w/input=70%
  searchInput: {
    flex: 0.7,
  },
  searchButton: {
    flex: 0.3,
  },
  // countXxx is placeholding
  countRow: {
    flexDirection: 'row'
  },
  countText: {
    flex: 0.8,
  },
  countNum: {
    flex: 0.2,
  },
  scrollSection: {
    flex: 0.8,
  },
  resultImage: {
    height: 150,
  },
  resultText: {
    backgroundColor: '#000',
    color: '#fff',
    height: 20,
  },
});

// place whichever pieces of app state this component needs into its props
function mapStateToProps(state) {
  return {
    searchedRecipes: state.searchedRecipes, // from `searchedRecipes` reducer
    recipeCount: state.recipeCount, // from 'recipeCount' reducer, but resulting from setSearchedRecipes action
  }
}

// MapStateToProps
export default connect(mapStateToProps)(Home);
