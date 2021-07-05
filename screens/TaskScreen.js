import React, {useState} from 'react'
import { TouchableOpacity, Text, View, Modal, ScrollView , TextInput} from 'react-native';
import { CheckBox , ListItem} from 'react-native-elements';
import DatePicker from 'react-native-date-picker';
import db from '../config'
export default class TaskScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            checked: false,
            isModalVisible: "false",
            title: "",
            tasks: [],
            date: "",
            emailId: firebase.auth().currentUser.email,
            noOfTasks: 0,
            points: 0,
            markedAsDone: false
        }
        this.taskRef = null
    }

    getTasksList = () => {
        this.taskRef = db.collection('tasks')
            .onSnapshot((snapshot) => {
                var tasksList = snapshot.docs.map((
                    doc.data()
                ))
                this.setState({
                    tasks: tasksList
                })
            })
    };




    addTask = () => {
        db.collection('tasks').add({
            date: this.state.date,
            email_id: this.state.emailId,
            points: this.state.points,
            marked_as_done: this.state.markedAsDone,
            title: this.state.title
        })
    };

    componentDidMount() {
        this.getTasksList()
    };

    componenWillUnmount() {
        this.taskRef();
    };
    componentDidUpdate() {
        this.getTasksList();
    }
    
    keyExtractor = (item, index) => index.toString();

    renderItem = () => {
        return (
            <ListItem
                key={i}
                leftElement={
                    <CheckBox
                        onPress={() => {
                            this.setState({
                                markedAsDone: !this.state.markedAsDone,
                                checked: !this.state.checked
                            })
                        }}
                        title={item.title}
                        textStyle={this.state.checked ?
                            [{ textDecorationLine: 'line-through' }] :
                            [{ textDecorationLine: 'none' }]
                        }
                        checked={this.state.checked}
                    />}
                rightElement={
                    <Text>
                        {item.date}
                    </Text>
                }
            />
        )
    }
    showModal = () => {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible = {this.state.isModalVisible}
            >
                <ScrollView>
                    <View style = {styles.signupView}>
                       <Text style={{textAlign: 'center',fontStyle: 'italic',fontSize:'25'}}>Add a Task</Text> 
                    </View>
                    <View>
                        <TextInput
                            onChangeText={(text) => {
                                this.setState({
                                    title: text
                                });
                            }}
                            placeholder = "Enter Your Task Here"
                        />
                    const [date, setDate] = useState(new Date())    
                        return(
                        <DatePicker
                            date={date}
                            onDateChange={this.setState({
                                date: useState(new Date())
                            })}
                        />
                        )
                        <TouchableOpacity
                            onPress={() => {
                                this.addTask();
                                this.setState({
                                    isModalVisible: false,
                                })
                            }}
                            style={{ alignSelf: 'center' }}>
                            <Text>Add Task!</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    isModalVisible: false,
                                })
                            }}
                            style={{ alignSelf: 'center' }}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                
            </Modal>
            )
        
    }
    render() {
        return (
            <View>
                {this.showModal()}
                <TouchableOpacity
                    onPress={() => { this.setState({ isModalVisible: true }) }}
                    style={{ borderRadius: 30, width: 100, height: 100, alignSelf: 'center', backgroundColor: 'blue' }}>
                    <Text>➕</Text>
                </TouchableOpacity>
                
                <FlatList
                    keyExtractor={this.keyExtractor}
                    data = {this.state.tasks}
                    renderItem = {this.renderItem}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
  signupView: {
    flex: 0.05,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6fc0b8"
  },
})