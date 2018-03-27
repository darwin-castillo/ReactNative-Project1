 <ImageBackground resizeMode='cover' style={styles.container} source={require('./app_movil.png')}
            >

                <Modal
                    visible={this.state.modalVisible}
                    animationType={'slide'}
                    onRequestClose={() => this.closeModal()}
                >

                    <View style={styles.modalText}>
                        <View style={styles.modalText}>
                            <Text>{this.state.mesg}</Text>
                            <Button
                                onPress={() => this.closeModal()}
                                title="Close modal">
                            </Button>
                        </View>
                    </View>
                </Modal>

                <Spinner
                    visible={this.state.spinnerVisible}
                    textContent= {this.state.spinnerMessage}
                    textStyle={{color: '#FFF'}}
                    animation="fade"
                    //  overlayColor="#114512"
                />

                <PopoverTooltip
                    ref='tooltip_usr'
                    buttonComponent={

                        <TextInput
                            style={[styles.logginInputs,
                                {
                                    height: 40,
                                    borderWidth: 0,
                                    alignSelf: 'stretch',
                                    color: 'white',

                                }]}
                            placeholderTextColor="white"
                            onChangeText={(user) => this.setState({user})}
                            returnKeyType="next"
                            onSubmitEditing={() => this.passwordTextInput.focus()}
                            /* const user = Object.assign({}, this.state.inputs, {user: username });
                             this.setState({ user });*/
                            underlineColorAndroid="white"
                            value={this.state.user}
                            placeholder={'Usuario'}
                            ref={(input) => this.userTextInput = input}
                        />

                    }

                    items={[
                        {
                            label: this.state.tooltip_msg_usr,
                            onPress: () => {
                            }
                        }

                    ]}
                    // animationType='timing'
                    // using the default timing animation
                />

                <PopoverTooltip
                    ref='tooltip_pass'
                    buttonComponent={
                        <TextInput
                            style={[styles.logginInputs,
                                {
                                    height: 40,
                                    borderWidth: 0,
                                    alignSelf: 'stretch',
                                    color: 'white',
                                }]}
                            placeholderTextColor="white"
                            onChangeText={(password) => this.setState({password})}
                            placeholder={'Contraseña'}
                            value={this.state.password}
                            secureTextEntry={true}
                            returnKeyType="send"
                            onSubmitEditing={this.Login.bind(this)}
                            ref={(input) => this.passwordTextInput = input}
                        />

                    }

                    items={[
                        {
                            label: this.state.tooltip_msg_pass,
                            onPress: () => {
                            }
                        }

                    ]}
                    // animationType='timing'
                    // using the default timing animation
                />

                <TouchableHighlight
                    style={styles.submit}
                    onPress={() => this.AlternativeLogin()}
                    underlayColor='#fff'>
                    <Text style={[styles.submitText]}>INGRESAR</Text>
                </TouchableHighlight>

            </ImageBackground>