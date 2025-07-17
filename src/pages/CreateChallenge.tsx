{/* <div className="space-y-6">
                                        <div className="flex justify-between items-center">
                                            <h2 className="text-xl font-semibold">Challenges</h2>
                                            <Button
                                                type="button"
                                                onClick={() => append({
                                                    name: "",
                                                    player_address_variable: "",
                                                    function_name: "",
                                                    useForwarder: false,
                                                    forwarderAddress: "",
                                                    forwarderABI: "",
                                                    methodDataAttributeName: "",
                                                    wantedData: "",
                                                    countItems: false,
                                                    contract_address: "",
                                                    abi: "",
                                                })}
                                                variant="outline"
                                                size="sm"
                                            >
                                                <Plus className="h-4 w-4 mr-2" />
                                                Add Challenge
                                            </Button>
                                        </div>

                                        {fields.map((field, index) => (
                                            <Card key={field.id} className="border-secondary/20 bg-secondary/5">
                                                <CardHeader>
                                                    <div className="flex justify-between items-center">
                                                        <CardTitle className="text-lg">Challenge {index + 1}</CardTitle>
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => remove(index)}
                                                            disabled={fields.length === 1}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </CardHeader>

                                                <CardContent className="space-y-4">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <FormField
                                                            control={form.control}
                                                            name={`challenges.${index}.name`}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Challenge Name</FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="e.g., Survive 100 Waves" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={form.control}
                                                            name={`challenges.${index}.player_address_variable`}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Player Address Variable</FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="e.g., playerAddress" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={form.control}
                                                            name={`challenges.${index}.function_name`}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Function Name</FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="e.g., completeWave" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={form.control}
                                                            name={`challenges.${index}.contract_address`}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Contract Address</FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="0x..." {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>

                                                    <FormField
                                                        control={form.control}
                                                        name={`challenges.${index}.useForwarder`}
                                                        render={({ field }) => (
                                                            <FormItem className="flex items-center space-x-2">
                                                                <FormControl>
                                                                    <Switch
                                                                        checked={field.value}
                                                                        onCheckedChange={field.onChange}
                                                                    />
                                                                </FormControl>
                                                                <FormLabel>Use Forwarder</FormLabel>
                                                            </FormItem>
                                                        )}
                                                    />

                                                    {form.watch(`challenges.${index}.useForwarder`) && (
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <FormField
                                                                control={form.control}
                                                                name={`challenges.${index}.forwarderAddress`}
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Forwarder Address</FormLabel>
                                                                        <FormControl>
                                                                            <Input placeholder="0x..." {...field} />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />

                                                            <FormField
                                                                control={form.control}
                                                                name={`challenges.${index}.forwarderABI`}
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Forwarder ABI</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="file"
                                                                                accept=".json"
                                                                                onChange={(e) => {
                                                                                    const file = e.target.files?.[0];
                                                                                    if (file) {
                                                                                        field.onChange(file.name);
                                                                                    }
                                                                                }}
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                    )}

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <FormField
                                                            control={form.control}
                                                            name={`challenges.${index}.methodDataAttributeName`}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Method Data Attribute Name</FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="e.g., methodData" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={form.control}
                                                            name={`challenges.${index}.wantedData`}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Wanted Data</FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="e.g., waveNumber" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>

                                                    <FormField
                                                        control={form.control}
                                                        name={`challenges.${index}.countItems`}
                                                        render={({ field }) => (
                                                            <FormItem className="flex items-center space-x-2">
                                                                <FormControl>
                                                                    <Switch
                                                                        checked={field.value}
                                                                        onCheckedChange={field.onChange}
                                                                    />
                                                                </FormControl>
                                                                <FormLabel>Count Items</FormLabel>
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name={`challenges.${index}.abi`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Challenge ABI</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        type="file"
                                                                        accept=".json"
                                                                        onChange={(e) => {
                                                                            const file = e.target.files?.[0];
                                                                            if (file) {
                                                                                field.onChange(file.name);
                                                                            }
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div> */}